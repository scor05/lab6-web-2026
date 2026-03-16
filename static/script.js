const getMessages = async () => {
    const response = await fetch('/messages');
    const messages = await response.json();

    const ul = document.getElementById('messageList');
    ul.innerHTML = '';
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].text != '' && messages[i].user != '') {
            const originalText = messages[i].text;
            const displayText = (originalText.length >= 140) ? originalText.substring(0, 139) + "..." : originalText;
            const li = document.createElement('li');
            li.innerHTML = `<strong>${messages[i].user}</strong>: ${displayText}`;

            ul.appendChild(li)
        }
    }
}

getMessages();

setInterval(getMessages, 2000); // refrescar mensaje automáticamente

const postMessages = async () => {
    const text = document.getElementById("message").value;
    const user = document.getElementById("userEntry").value;
    const userText = (user == '') ? 'Usuario' : user;
    if (text == '') {
        alert("Debe de ingresar un mensaje");
    } else {
        console.log("sending message: ", text, userText)
        const response = await fetch("/messages", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: `${userText}`,
                text: `${text}`
            })
        });
        getMessages();
    }
}

const messageTextArea = document.getElementById("message");
messageTextArea.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        postMessages();
        messageTextArea.value = '';
    }
});
