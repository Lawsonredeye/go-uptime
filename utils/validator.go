// package main
package utils

import (
	"errors"
	"gouptime/model"
)

// UserValidator validates the members of the model.Account object
// checking returns an error if any field is empty.
func SignUpValidator(user model.Account) error {
	if user.Name == "" {
		return errors.New("empty name field found")
	}

	if user.Email == "" {
		return errors.New("empty email field found")
	}

	if user.Password == "" {
		return errors.New("empty password field found")
	}
	return nil
}

func LoginValidator(user model.Account) error {
	if user.Email == "" {
		return errors.New("empty email field found")
	}

	if user.Password == "" {
		return errors.New("empty password field found")
	}
	return nil
}
