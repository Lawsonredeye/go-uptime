package utils

import (
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gopkg.in/gomail.v2"
)

// Sends Alerts to the specified email address of the client.
func SendMail(url, email string) error {
	if err := godotenv.Load(); err != nil {
		log.Fatalln("Loading env", err)
	}
	SMTP_PASSWORD := os.Getenv("SMTP_MAIL_PASSWORD")
	
	m := gomail.NewMessage()
	m.SetHeader("From", "support@eradiographer.com")
	m.SetHeader("To", email)
	m.SetHeader("Subject", fmt.Sprintf("GoUptime Alert: %s Down", url))
	m.SetBody("text/plain", fmt.Sprintf("We detected an issue with %s. Please check its status.", url))

	d:= gomail.NewDialer("mail.eradiographer.com", 587, "support@eradiographer.com", SMTP_PASSWORD)
	d.SSL = false

	if err := d.DialAndSend(m); err != nil {
		log.Printf("Email processing Error. %s", err)
		return errors.New("email alert failed to send")
	}

	log.Printf("Email sent to %v successfully.", email)
	return nil
}