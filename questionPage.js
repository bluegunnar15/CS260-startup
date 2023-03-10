
function back() {
    window.location.href = "popularPage.html";
}

function postCommentWrapper() {
    const newComment = document.querySelector("#newComment");
    if (newComment.value != "") {
        questionPage.postComment(newComment.value);
    }
}

function addAgreeWrapper() {
    questionPage.addAgree();
}

function addDisagreeWrapper() {
    questionPage.addDisagree();
}

function addUnsureWrapper() {
    questionPage.addUnsure();
}


class QuestionPage {
    constructor(question, user, comments, upVotes, downVotes, unsureVotes) {
        this.question = question;
        this.user = user;
        this.comments = comments;
        this.numUpVotes = upVotes;
        this.numDownVotes = downVotes;
        this.numUnsureVotes = unsureVotes;

        const playerNameEl = document.querySelector('#player-name');
        playerNameEl.textContent = this.getPlayerName();

        const questionNameElement = document.querySelector('.question-name');
        questionNameElement.textContent = this.question;


        const authorNameElement = document.querySelector('.author-name');
        authorNameElement.textContent = "Posted by: " + this.user;


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
        const test = "<h5 style =\"text-align: center; \"> " + this.numUpVotes + " people agree, " + this.numDownVotes + " people disagree, and " + this.numUnsureVotes + " people are unsure. </h5>";

        child.innerHTML = test;

        votingBox.appendChild(child);

    }

    addAgree() {
        this.numUpVotes++;
        this.clearVotingOption();
        this.drawChart();
    }

    addDisagree() {
        this.numDownVotes++;
        this.clearVotingOption();
        this.drawChart();
    }

    addUnsure() {
        this.numUnsureVotes++;
        this.clearVotingOption();
        this.drawChart();
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

        this.comments.forEach((item, index) => {

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
                    data: [this.numUpVotes, this.numDownVotes, this.numUnsureVotes]
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

const curQuestion = localStorage.getItem('currentQuestion');

const questionPage = new QuestionPage(localStorage.getItem('qQuestion'), localStorage.getItem('qUser'), JSON.parse(localStorage.getItem("qComments")),
    localStorage.getItem('qUpVotes'), localStorage.getItem('qDownVotes'), localStorage.getItem('qUnsureVotes'),);
