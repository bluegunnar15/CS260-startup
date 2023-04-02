const NewPost = 'newPost';
const NewComment = 'newComment';

socketSingleton = null;

class SingletonSocket {
    constructor() {
        if (!socketSingleton) {
            socketSingleton = this;
            this.configureWebSocket();
        }

        return socketSingleton;
    }


    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) => {

        };
        this.socket.onclose = (event) => {

        };
        this.socket.onmessage = async (event) => {
            console.log("recieved");
            const msg = JSON.parse(await event.data.text());
            if (msg.type === NewComment) {
                //this.displayMsg('player', msg.from, `just commented!`);
                this.showPopupMessage("User:" + msg.from + " just commented!", 4000); // display message for 3 seconds
            } else if (msg.type === NewPost) {
                //this.displayMsg('player', msg.from, `just posted!`);
                this.showPopupMessage("User:" + msg.from + " just posted!", 4000); // display message for 3 seconds
            }
        };
    }

    showPopupMessage(message, duration) {
        const container = document.getElementById('popup-container');

        const messageEl = document.createElement('div');
        messageEl.innerHTML = message;

        container.appendChild(messageEl);

        setTimeout(() => {
            container.removeChild(messageEl);
        }, duration);
    }

    displayMsg(cls, from, msg) {
        const chatText = document.querySelector('#player-messages');
        chatText.innerHTML =
            `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
    }
    broadcastEvent(from, type, value) {
        const event = {
            from: from,
            type: type,
            value: value,
        };
        this.socket.send(JSON.stringify(event));
        console.log("Casted");
    }
}