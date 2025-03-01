package model

type UserDetails struct {
	URL        string `json:"url"`
	AlertCount int    `json:"alert_count"`
}

type Account struct {
	ID               int    `json:"id"`
	Name             string `json:"name"`
	Email            string `json:"email"`
	Password         string `json:"password"`
	OrganizationName string `json:"organization_name"`
	Subscription     string `json:"subscription"`
	ApiToken         string `json:"api_token"`
}
