package main

import (
	//	"database/sql"
	"fmt"
	"io"
	_ "modernc.org/sqlite"
	"net/http"
)

type Message struct {
	ID   int    `json:"id"`
	TEXT string `json:"text"`
	USER string `json:"user"`
}

var chatApi = "https://chat.joelsiervas.online/"

func getMessages(w http.ResponseWriter, r *http.Request) {
	resp, _ := http.Get(chatApi + "/messages")
	io.Copy(w, resp.Body)
}

func postMessages(w http.ResponseWriter, r *http.Request) {

}

func main() {
	http.Handle("GET /", http.FileServer(http.Dir("static")))
	http.HandleFunc("GET /api/messages", getMessages)
	http.HandleFunc("POST /api/messages", postMessages)

	fmt.Println("Server running on port 8080")
	err := http.ListenAndServe("127.0.0.1:8080", nil)
	if err != nil {
		fmt.Println("Error in connection: ", err)
	}
}
