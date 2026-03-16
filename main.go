package main

import (
	"encoding/json"
	"fmt"
	_ "modernc.org/sqlite"
	"net/http"
)

type Message struct {
	ID   int    `json:"id"`
	TEXT string `json:"text"`
	USER string `json:"user"`
}

var chatApi = "https://chat.joelsiervas.online"

func getMessages(w http.ResponseWriter, r *http.Request) {
	var messages = []Message{}
	resp, err := http.Get(chatApi + "/messages")
	if err != nil {
		fmt.Printf("Error in API get: ", err)
	}
	json.NewDecoder(resp.Body).Decode(&messages)
	json.NewEncoder(w).Encode(messages)
}

func postMessages(w http.ResponseWriter, r *http.Request) {
	_, err := http.Post(chatApi+"/messages", "application/json", r.Body)
	if err != nil {
		fmt.Printf("Error in API post: ", err)
	}
	w.WriteHeader(200)
}

func main() {
	http.Handle("GET /", http.FileServer(http.Dir("./static")))
	http.HandleFunc("GET /messages", getMessages)
	http.HandleFunc("POST /messages", postMessages)
	http.Handle("GET /static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	fmt.Println("Server running on port 8080")
	err := http.ListenAndServe("127.0.0.1:8080", nil)
	if err != nil {
		fmt.Println("Error in connection: ", err)
	}
}
