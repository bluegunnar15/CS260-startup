
const postButton = document.querySelector('#postButton');

postButton.addEventListener("click", function () {
    const questionElement = document.querySelector("#newPostQuestion");
    const newQ = questionElement.value;

    saveQuestion(newQ);
    //localStorage.setItem("newPostQuestion", newQ);

    //window.location.href = "popularPage.html";

});

async function saveQuestion(question) {
    //const userName = this.getPlayerName();
    //const date = new Date().toLocaleDateString();

    const newQuestion = new Question("firstQuestion", "Lilyana Blackman", {}, 50, 50, 20);


    try {
        const response = await fetch('/api/postQuestion', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newQuestion),
        });

        // Store what the service gave us as the high scores
        const questions = await response.json();
        localStorage.setItem('allQuestions', JSON.stringify(questions));
    } catch {
        // If there was an error then just track scores locally
        //this.updateScoresLocal(question);
    }
}


class PostPage {
    constructor() {
        const playerNameEl = document.querySelector('#player-name');
        playerNameEl.textContent = this.getPlayerName();

        const postedBy = document.querySelector('.posted-by');
        postedBy.textContent = "Posting as: " + this.getPlayerName();


    }


    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
}

const postPage = new PostPage();