const getMessages = async () => {
    const response = await fetch('/messages');
    const messages = await response.json();

    const ul = document.getElementById('messageList');
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

setInterval(getMessages, 5000);
