async function loadPopularQuestions() {
    let questions = [];

    try {
        // Get the latest high scores from the service
        const response = await fetch('/api/getPopular');
        questions = await response.json();

        console.log(questions);

        const commentBoard = document.getElementsByClassName('questionList');

        questions.forEach(function (item) {

            const child = document.createElement('div');
            child.className = "demo-box";
            child.style = "text-align: left; border-color: black;";

            const test = "<div style =\"text-align: left; font-size: large; font-weight: bold; \">" + item.question + "</div><div style=\"text-align: right; position:relative; font-size: large;\"> Posted by: " + item.user + "<\div>";

            console.log(item.timePosted);

            child.addEventListener("click", function () {
                localStorage.setItem("qQuestion", item.question);
                localStorage.setItem("qUser", item.user);
                localStorage.setItem("qTime", item.timePosted);
                localStorage.setItem("qComments", JSON.stringify(item.comments));
                localStorage.setItem("qUpVotes", item.numUpVotes);
                localStorage.setItem("qDownVotes", item.numDownVotes);
                localStorage.setItem("qUnsureVotes", item.numUnsureVotes);

                window.location.href = "questionPage.html";
            });

            child.innerHTML = test;

            commentBoard[0].appendChild(child);

        })

    } catch (e) {
        console.log("ERROR " + e);
    }

}

class PopularPage {
    constructor() {
        const playerNameEl = document.querySelector('#player-name');
        playerNameEl.textContent = this.getPlayerName();

        loadPopularQuestions();
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
}

const popPage = new PopularPage();
