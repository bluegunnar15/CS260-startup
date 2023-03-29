function back() {
    window.location.href = "popularPage.html";
}

const commentButton = document.querySelector('#commentButton');

commentButton.addEventListener("click", async function () {
    postCommentWrapper();
});

async function postCommentWrapper() {
    const newComment = document.querySelector("#newComment").value;
    console.log(newComment);

    const j = {
        "question": localStorage.getItem('qQuestion'),
        "newComment": newComment
    }

    try {
        const response = await fetch('/api/addComment', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(j),
        });

    } catch (e) {
        console.log("An error occured: " + e);
    }


    return;



    if (newComment.value != "") {
        questionPage.postComment(newComment.value);
    }
}

async function addAgreeWrapper() {

    try {
        const response = await fetch('/api/addAgree', {
            method: 'POST',
            headers: { 'content-type': 'text/plain' },
            body: localStorage.getItem('qQuestion'),
        });

    } catch (e) {
        console.log("An error occured: " + e);
    }

    await updateLocalStorage();
    questionPage.clearVotingOption();
    questionPage.drawChart();
}

async function addDisagreeWrapper() {

    try {
        const response = await fetch('/api/addDisagree', {
            method: 'POST',
            headers: { 'content-type': 'text/plain' },
            body: localStorage.getItem('qQuestion'),
        });

    } catch (e) {
        console.log("An error occured: " + e);
    }

    await updateLocalStorage();
    questionPage.clearVotingOption();
    questionPage.drawChart();
}

async function addUnsureWrapper() {

    try {
        const response = await fetch('/api/addUnsure', {
            method: 'POST',
            headers: { 'content-type': 'text/plain' },
            body: localStorage.getItem('qQuestion'),
        });

    } catch (e) {
        console.log("An error occured: " + e);
    }

    await updateLocalStorage();
    questionPage.clearVotingOption();
    questionPage.drawChart();
}

async function updateLocalStorage() {
    try {
        const response = await fetch('/api/getQuestion', {
            method: 'POST',
            headers: { 'content-type': 'text/plain' },
            body: localStorage.getItem('qQuestion'),
        });

        const item = await response.json();

        localStorage.setItem("qQuestion", item.question);
        localStorage.setItem("qUser", item.user);
        localStorage.setItem("qComments", JSON.stringify(item.comments));
        localStorage.setItem("qUpVotes", item.numUpVotes);
        localStorage.setItem("qDownVotes", item.numDownVotes);
        localStorage.setItem("qUnsureVotes", item.numUnsureVotes);


    } catch (e) {
        console.log("An error occured: " + e);
    }
}

class QuestionPage {
    constructor() {
        const playerNameEl = document.querySelector('#player-name');
        playerNameEl.textContent = this.getPlayerName();

        const questionNameElement = document.querySelector('.question-name');
        questionNameElement.textContent = localStorage.getItem('qQuestion');


        const authorNameElement = document.querySelector('.author-name');
        authorNameElement.textContent = "Posted by: " + localStorage.getItem('qUser');


        //Create the voting chart
        this.drawChart();

        //display the comments
        this.displayComments();

    }

    clearVotingOption() {
        const votingBox = document.querySelector('.voting-options');
        const pleaseVote = document.querySelector('.please-vote');
        const votingResults = document.querySelector('.voting-results');



        //remove the option to vote
        while (votingBox.firstChild) {
            votingBox.removeChild(votingBox.firstChild);
        }

        pleaseVote.textContent = "Thank you for voting- Here are the numbers";
        votingResults.textContent = "";//"Agree: " + this.numUpVotes + " Disagree " + this.numDownVotes + " Unsure: " + this.numUnsureVotes;

        const child = document.createElement('div');
        child.style = "";
        const test = "<h5 style =\"text-align: center; \"> " + localStorage.getItem('qUpVotes') + " people agree, " + localStorage.getItem('qDownVotes') + " people disagree, and " + localStorage.getItem('qUnsureVotes') + " people are unsure. </h5>";

        child.innerHTML = test;

        votingBox.appendChild(child);

    }

    postComment(newComment) {
        this.comments.push(newComment);
        const commentBoard = document.getElementsByClassName('questionComments');

        const child = document.createElement('div');
        child.className = "demo-box";
        const test = "<div>" + newComment + "</div>";
        child.innerHTML = test;

        commentBoard[0].appendChild(child);

    }

    displayComments() {
        const commentBoard = document.getElementsByClassName('questionComments');

        //questions.forEach(function (item) {
        const comments = JSON.parse(localStorage.getItem("qComments"));

        console.log(comments);
        comments.forEach((item, index) => {

            const child = document.createElement('div');
            child.className = "demo-box";
            const test = "<div>" + item + "</div>";
            child.innerHTML = test;

            commentBoard[0].appendChild(child);
        })
    }

    drawChart() {
        if (this.chart != null) {
            this.chart.destroy();
        }
        this.chart = new Chart(document.getElementById("pie-chart"), {
            type: 'pie',

            data: {
                labels: ["Agree", "Disagree", "Unsure"],
                datasets: [{
                    backgroundColor: ["#4CBB17", "#EE4B2B", "#1F51FF"],
                    data: [localStorage.getItem('qUpVotes'), localStorage.getItem('qDownVotes'), localStorage.getItem('qUnsureVotes')]
                }]
            },
            options: {
                title: {
                    display: false,
                    layout: {
                        padding: {
                            left: 30,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    }
                },
                legend: {
                    position: 'left',
                    display: true,
                    labels: {
                        fontSize: 20
                    }
                }
            }
        });
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
}


const questionPage = new QuestionPage();

