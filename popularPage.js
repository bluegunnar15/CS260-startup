class Question {

    constructor(question) {
        this.question = question;
        this.user = "Fake User";
        //This will eventually pool the database
        this.comments = this.getComments();
        this.numUpVotes = 8;
        this.numDownVotes = 6;
        this.numUnsureVotes = 1;
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

    getComments() {
        let tmpComments = [];
        for (let i = 0; i < 8; i++) {
            tmpComments[i] = "Fake Comment " + i;
        }

        return tmpComments;
    }

    addComment(newComment) {
        this.comments.push(newComment);
    }

}


class PopularPage {
    constructor() {
        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();

        //get all the questions stored in the database
        this.allQuestions = this.generateFakeQuestions();


        this.displayAllQuestions();

    }

    generateFakeQuestions() {
        let fakeQuestions = [];
        for (let i = 0; i < 10; i++) {
            fakeQuestions[i] = new Question("This is a fake question #" + i);
        }

        return fakeQuestions;
    }

    displayAllQuestions() {
        const commentBoard = document.getElementsByClassName('questionList');
        this.allQuestions.forEach((item, index) => {

            const child = document.createElement('div');
            child.className = "demo-box";
            child.style = "text-align: left; border-color: black;";

            const test = "<div style=\"position:relative; font-size: x-large;\"> By: " + item.user + "<\div><button style=\"position: absolute;right: 5%; top: 12px;\"type=\"button\"class=\"btn btn-primary\">Continue Reading</button><div>" + item.question + "</div>";
            child.innerHTML = test;

            commentBoard[0].appendChild(child);

        })
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
}

const popPage = new PopularPage();