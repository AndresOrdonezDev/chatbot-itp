document.getElementById('send-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: userInput })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                const chatBox = document.getElementById('chat-box');

                // Añadir mensaje del usuario
                const userMessage = document.createElement('div');
                userMessage.classList.add('message', 'sent');
                userMessage.textContent = userInput;
                chatBox.appendChild(userMessage);

                // Añadir mensaje del asistente
                const assistantMessage = document.createElement('div');
                assistantMessage.classList.add('message', 'received');
                assistantMessage.textContent = data.content;
                chatBox.appendChild(assistantMessage);

                // Desplazar hacia abajo
                chatBox.scrollTop = chatBox.scrollHeight;

                // Limpiar el input del usuario
                document.getElementById('user-input').value = '';
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
