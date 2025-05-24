package utils

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"time"
)

// Ping sends request to the user url and returns a status Code
// and an error if url is not valid.
//
// Returns:
//
//	int 	- number representing status code.
//	error 	- errors occurred during request.
func Ping(urlStr string) (int, error) {
	// Validate URL format
	parsedURL, err := url.ParseRequestURI(urlStr)
	if err != nil {
		return 0, fmt.Errorf("invalid URL format: %w", err)
	}

	// Only allow HTTP/HTTPS URLs
	if parsedURL.Scheme != "http" && parsedURL.Scheme != "https" {
		return 0, errors.New("URL must use HTTP or HTTPS protocol")
	}

	// Create a context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Create a request with the context
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, urlStr, nil)
	if err != nil {
		return 0, fmt.Errorf("failed to create request: %w", err)
	}

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		// Check if the error is due to timeout
		if ctx.Err() == context.DeadlineExceeded {
			return 0, errors.New("request timed out after 10 seconds")
		}
		return 0, fmt.Errorf("failed to reach URL: %w", err)
	}
	defer res.Body.Close()

	return res.StatusCode, nil
}

// Monitor queries the url server and observe the response for a non 200 OK status
// and sends an email to notify the user based on the error found.
func Monitor(url string, email string, db *sql.DB) {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		status, err := Ping(url)
		if err != nil {
			log.Printf("Error pinging %s: %v", url, err)
			SendMail(url, email)
			ticker.Stop()
		}

		_, err = db.Exec("UPDATE endpoints SET status = ? WHERE url = ?", status, url)
		if err != nil {
			log.Printf("DB Error: %v", err)
			continue
		}

		// Sending alerts
		var alertCount int
		err = db.QueryRow("SELECT alert_count FROM endpoints WHERE url = ?", url).Scan(&alertCount)
		if err != nil {
			log.Printf("DB query error: %v", err)
			return
		}

		if status != http.StatusOK && alertCount < 5 {
			log.Printf("Alert: %s is down (status %d)", url, status)
			// send mail to user
			SendMail(url, email)
			_, err := db.Exec("UPDATE endpoints SET alert_count = alert_count + 1 WHERE url = ?", url)
			if err != nil {
				log.Printf("Alert count update error: %v", err)
			}
		}
	}
}
