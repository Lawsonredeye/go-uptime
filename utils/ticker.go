package utils

import (
	"database/sql"
	"errors"
	"log"
	"net/http"
	"time"
)

// Ping sends request to the user url and returns a status Code
// and an error if url is not valid.
// Returns:
//
// 		int 	- number representing status code.
// 		error 	- errors occurred during request.
func Ping(url string) (int, error) {
	res, err := http.Get(url)
	if err != nil {
		return 0, errors.New("can not reach input url, please validate your inputted url")
	}

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
			continue
		}

		_, err = db.Exec("UPDATE endpoints SET status = ? WHERE url = ?",  status, url)
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