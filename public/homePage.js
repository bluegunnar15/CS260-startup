const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

function meow() {
    console.log("click");
    //broadcastEvent(localStorage.getItem('userName'), GameStartEvent, {});
}

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
        this.displayMsg('system', 'game', 'connected');
    };
    this.socket.onclose = (event) => {
        this.displayMsg('system', 'game', 'disconnected');
    };
    this.socket.onmessage = async (event) => {
        console.log("recieved");
        const msg = JSON.parse(await event.data.text());
        if (msg.type === GameEndEvent) {
            this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
        } else if (msg.type === GameStartEvent) {
            this.displayMsg('player', msg.from, `started a new game`);
        }
    };


}

function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
        `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
}
function broadcastEvent(from, type, value) {
    const event = {
        from: from,
        type: type,
        value: value,
    };
    this.socket.send(JSON.stringify(event));
    console.log("Casted");
}


class HomePage {
    socket;

    constructor() {
        const welcomeEl = document.querySelector('#welcomeSign');
        welcomeEl.textContent = "Welcome " + localStorage.getItem('userName') + " to DumbQuestions!";


        const playerNameEl = document.querySelector('#player-name');
        playerNameEl.textContent = this.getPlayerName();

        configureWebSocket();

        broadcastEvent(localStorage.getItem('userName'), GameStartEvent, {});

    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }

}


const page = new HomePage();

//page.broadcastEvent(localStorage.getItem('userName'), GameStartEvent, {});

