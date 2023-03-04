class PostPage {
    constructor() {
        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();

        //get all the questions stored in the database
        this.allQuestions = this.generateFakeQuestions();



    }


    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
}

const postPage = new PostPage();