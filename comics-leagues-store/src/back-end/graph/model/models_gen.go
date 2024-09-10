// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Book struct {
	ID     string `json:"id"`
	Title  string `json:"title"`
	Author *User  `json:"author"`
}

type Mutation struct {
}

type NewBook struct {
	Title  string `json:"title"`
	UserID string `json:"userId"`
	Name   string `json:"name"`
}

type Query struct {
}

type User struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
