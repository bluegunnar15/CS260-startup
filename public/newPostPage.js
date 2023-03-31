
function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
}

const postButton = document.querySelector('#postButton');

postButton.addEventListener("click", async function () {
    const questionElement = document.querySelector("#newPostQuestion");
    const newQ = questionElement.value;

    await saveQuestion(newQ).then(window.location.href = "popularPage.html");

});

async function saveQuestion(question) {
    const userName = getPlayerName();
    //const date = new Date().toLocaleDateString();

    const newQuestion = new Question(question, userName, [], 0, 0, 0);


    try {
        const response = await fetch('/api/postQuestion', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newQuestion),
        });



        // Store what the service gave us as the high scores
        //const questions = await response.json();
        //localStorage.setItem('allQuestions', JSON.stringify(questions));
    } catch {
        // If there was an error then just track scores locally
        //this.updateScoresLocal(question);
        console.log("An error occured: " + e);
    }
}


class PostPage {
    constructor() {
        const playerNameEl = document.querySelector('#player-name');
        playerNameEl.textContent = getPlayerName();

        const postedBy = document.querySelector('.posted-by');
        postedBy.textContent = "Posting as: " + getPlayerName();


    }
}

const postPage = new PostPage();