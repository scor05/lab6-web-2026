var messages = [];

const getMessages = async () => {
    const response = await fetch('/messages');
    const messagesNew = await response.json();
    if (JSON.stringify(messages) === JSON.stringify(messagesNew)) {
        return;
    }
    messages = messagesNew;

    const ul = document.getElementById('messageList');
    ul.innerHTML = '';
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].text != '' && messages[i].user != '') {
            const originalText = messages[i].text;
            const displayText = (originalText.length >= 140) ? originalText.substring(0, 139) + "..." : originalText;
            const li = document.createElement('li');
            li.innerHTML = `<strong>${messages[i].user}</strong>: ${displayText}`;
            ul.appendChild(li)

            const imgTypes = ['png', 'jpg', 'jpeg', 'gif', 'webp']
            const isImg = imgTypes.some(value => originalText.includes(value));
            if (originalText.includes('https://') || originalText.includes('http://')) {
                const urlRegex = /(https?:\/\/[^\s]+)/g;
                const url = originalText.match(urlRegex);
                console.log("url detected: ", url);

                if (isImg) {
                    const imgElement = document.createElement("img");
                    imgElement.setAttribute('src', url);
                    ul.appendChild(imgElement);
                } else {
                    const iframe = document.createElement("iframe");
                    iframe.setAttribute('src', url);
                    iframe.setAttribute('width', '800');
                    iframe.setAttribute('height', '700');
                    ul.appendChild(iframe);
                }
            }
        }
    }
}

getMessages();
setInterval(getMessages, 5000);


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
