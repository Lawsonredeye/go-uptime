package auth

import (
	"database/sql"
	"gouptime/model"
	"gouptime/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

// Login validates user credentials and logs user into the application for
// sending authorized requests.
func Login(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user model.Account
		c.BindJSON(&user)

		err := utils.LoginValidator(user)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		var password string
		err = db.QueryRow("SELECT password FROM users where email = ?", user.Email).Scan(&password)

		if err != nil {
			log.Println(err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "User with email not found"})
			return
		}
		if err = bcrypt.CompareHashAndPassword([]byte(password), []byte(user.Password)); err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Incorrect name or password."})
			return
		}
		newUUID := uuid.New()
		user.ApiToken = newUUID.String()

		_, err = db.Exec("UPDATE users SET api_token = ? WHERE email = ?", user.ApiToken, user.Email)
		if err != nil {
			log.Println(err)
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "unable to store user token."})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Login success", "details": gin.H{"api_token": user.ApiToken}})
	}
}
