

function postCommentWrapper() {
    const newComment = document.querySelector("#newComment");
    question.postComment(newComment.value);
}

class Question {

    constructor(question) {
        this.question = question;

        //This will pool the database
        this.comments = this.getComments();
        this.numUpVotes = 8;
        this.numDownVotes = 6;
        this.numUnsureVotes = 1;

        //set display information
        const questionNameElement = document.querySelector('.question-name');
        questionNameElement.textContent = this.question;

        //Create the voting chart
        this.createChart();

        //display the comments
        this.displayComments();
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

    createChart() {
        new Chart(document.getElementById("pie-chart"), {
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


}

class PageInformation {
    constructor() {
        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
}


const page = new PageInformation();
const question = new Question("Test:: Let’s imagine you have left over pizza in the refrigerator. You get hungry, do you either eat the pizza cold or warm it up in the microwave? I argue that it tastes better to eat it cold. When you microwave the pizza, it becomes all floppy and nasty.");