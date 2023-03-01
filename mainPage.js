class Question {


    constructor() {
        console.log("hello");
        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }

}

const question = new Question();
