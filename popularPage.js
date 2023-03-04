import Question from 'questionPage.js';

class PopularPage {
    constructor() {
        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();

        //get all the questions stored in the database
        this.allQuestions = [];
        this.allQuestions[0] = new Question("Test");

        console.log(this.allQuestions[0]);
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
}

const popPage = new PopularPage();