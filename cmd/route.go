package cmd

import (
	"database/sql"
	"fmt"
	"gouptime/model"
	"gouptime/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// StartMonitoring stores users URL into the database and also runs a job
// to monitor the status of the server from the queried URL
func StartMonitoring(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user model.UserDetails
		if err := c.BindJSON(&user); err != nil || user.URL == "" {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Empty url field.",
			})
			return
		}

		id := c.GetString("id")

		status, err := utils.Ping(user.URL)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		_, err = db.Exec("INSERT INTO endpoints (url, status, alert_count, user_id) VALUES (?, ?, 0, ?)", user.URL, status, id)
		if err != nil {
			log.Printf("DB error: %v", err)
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to save endpoint.",
			})
			return
		}

		email := c.GetString("email")
		go utils.Monitor(user.URL, email, db)
		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("Monitoring %s started", user.URL),
		})
	}
}

// GetStatus fetches the entire endpoints stored in the db with the Status Response Code
// in the form of a list of map object.
func GetStatus(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		user_id, err := c.Cookie("user_id")
		log.Println("User id:", user_id)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unathorized"})
			return
		}
		rows, err := db.Query("SELECT url, status, alert_count FROM endpoints WHERE user_id = ?", user_id)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to fetch from db",
			})
			return
		}
		defer rows.Close()

		var results []gin.H
		for rows.Next() {
			var url string
			var status, alertCount int

			rows.Scan(&url, &status, &alertCount)
			results = append(results, gin.H{"url": url, "status": status, "alert_count": alertCount})
		}
		c.JSON(http.StatusOK, results)
	}
}
