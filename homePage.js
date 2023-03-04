class HomePage {
    constructor() {
        const welcomeEl = document.querySelector('#welcomeSign');
        welcomeEl.textContent = "Welcome " + localStorage.getItem('userName') + " to DumbQuestions!";


        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
}

const page = new HomePage();

