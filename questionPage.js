
function postCommentWrapper() {
    const newComment = document.querySelector("#newComment");
    if (newComment.value != "") {
        question.postComment(newComment.value);
    }
}

function addAgreeWrapper() {
    question.addAgree();
}

function addDisagreeWrapper() {
    question.addDisagree();
}

function addUnsureWrapper() {
    question.addUnsure();
}


class QuestionPage {
    constructor(question, user, comments, upVotes, downVotes, unsureVotes) {
        this.question = question;
        this.user = user;
        this.comments = comments;
        this.numUpVotes = upVotes;
        this.numDownVotes = downVotes;
        this.numUnsureVotes = unsureVotes;


        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();

        const questionNameElement = document.querySelector('.question-name');
        questionNameElement.textContent = this.question;

        //Create the voting chart
        this.drawChart();

        //display the comments
        this.displayComments();

    }

    addAgree() {
        this.numUpVotes++;
        this.drawChart();
    }

    addDisagree() {
        this.numDownVotes++;
        this.drawChart();
    }

    addUnsure() {
        this.numUnsureVotes++;
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

    getComments() {
        let tmpComments = [];
        for (let i = 0; i < 8; i++) {
            tmpComments[i] = "Fake Comment " + i;
        }

        return tmpComments;
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
                        fontSize: 40
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

const questionPage = new QuestionPage(localStorage.getItem('qQuestion'), localStorage.getItem('qUser'), localStorage.getItem('qComments'),
    localStorage.getItem('qUpVotes'), localStorage.getItem('qDownVotes'), localStorage.getItem('qUnsureVotes'),);
