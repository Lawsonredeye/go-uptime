package auth

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthMiddleWare(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		api_token := c.GetHeader("X-API-Key")
		if api_token == "" {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "missing X-API-Key token."})
			return
		}

		var (
			email string
			id    string
		)

		err := db.QueryRow("SELECT email, id FROM users WHERE api_token = ?", api_token).Scan(&email, &id)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid api key."})
			return
		}
		c.Set("email", email)
		c.Set("id", id)
		c.Next()
	}
}
