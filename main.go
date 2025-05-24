package main

import (
	"database/sql"
	"gouptime/auth"
	"gouptime/cmd"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {

	db, err := sql.Open("sqlite3", "./gouptime.db")
	if err != nil {
		log.Fatalf("DB error: %v", err)
	}

	defer db.Close()

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS endpoints (url TEXT PRIMARY KEY, user_id integer, status INT, alert_count INT)")
	if err != nil {
		log.Fatalf("DB creation error: %v", err)
	}

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT unique, password TEXT, organization_name TEXT, subscription TEXT, api_token TEXT)")
	if err != nil {
		log.Fatalf("DB creation error: %v", err)
	}

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "X-API-Key"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	
	r.POST("/signup", auth.SignUp(db))
	r.POST("/login", auth.Login(db))
	
	protected := r.Group("/api/v1")
	protected.Use(auth.AuthMiddleWare(db))
	protected.POST("/monitor", cmd.StartMonitoring(db))
	protected.GET("/status", cmd.GetStatus(db))

	r.Run(":8080")
}
