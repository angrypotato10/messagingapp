document.addEventListener('DOMContentLoaded', () => {


    // localStorage.setItem('username', username)

    if (localStorage.getItem('username') == null){
        let username = ""
        while (username == null || username == ""){
            username = prompt("Please enter your nickname");
        }       
        localStorage.setItem('username',username);
    };


    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {   

        button = document.querySelector("#submit");
        button.onclick = () => {
            message = document.querySelector("#message").value;
            const user = localStorage.getItem('username')
            socket.emit('submit message', {'message': message, 'user': user});
            };
    });

    // When a new vote is announced, add to the unordered list
    socket.on('chatlog', data => {
        const li = document.createElement('li');
        li.innerHTML = `${data.user}: ${data.message}`;
        document.querySelector('#chat').append(li);
    });
});
