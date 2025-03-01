package auth

import (
	"database/sql"
	"gouptime/model"
	"gouptime/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user model.Account
		c.BindJSON(&user)
		
		err := utils.SignUpValidator(user)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		h, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			log.Println(err)
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Unable to hash password, try again."})
			return
		}
		user.Password = string(h)
		_, err = db.Exec("INSERT INTO users(name, email, password, organization_name, subscription) VALUES (?, ?, ?, ?, ?)", user.Name, user.Email, user.Password, user.OrganizationName, user.Subscription)
		if err != nil {
			log.Println("DB Error", err)
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Email already exists in database"})
			return
		}
		c.JSON(http.StatusCreated, gin.H{"message": "Account created successfully. Login"})
	}
}
