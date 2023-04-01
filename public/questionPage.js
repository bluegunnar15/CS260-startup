function back() {
    window.location.href = "popularPage.html";
}

const commentButton = document.querySelector('#commentButton');

commentButton.addEventListener("click", async function () {
    postCommentWrapper();
});

async function postCommentWrapper() {
    const newCommentInput = document.querySelector("#newComment");
    const newComment = newCommentInput.value;
    newCommentInput.value = null;

    const j = {
        "question": localStorage.getItem('qQuestion'),
        "postingUser": localStorage.getItem('userName'),
        "newComment": newComment
    }

    try {
        const response = await fetch('/api/addComment', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(j),
        });

        await updateLocalStorage();
        questionPage.displayComments();

    } catch (e) {
        console.log("An error occured: " + e);
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
        localStorage.setItem("qTime", item.timePosted);
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
        console.log(localStorage.getItem('qTime'));
        authorNameElement.textContent = "Posted by " + localStorage.getItem('qUser') + " on " + localStorage.getItem('qTime');


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

    displayComments() {
        const commentBoard = document.getElementsByClassName('questionComments')[0];
        const comments = JSON.parse(localStorage.getItem('qComments'));

        // Remove all child elements from the comment board
        while (commentBoard.firstChild) {
            commentBoard.removeChild(commentBoard.firstChild);
        }

        comments.forEach((comment) => {
            const child = document.createElement('div');
            child.className = 'demo-box';
            child.style.textAlign = 'left';

            // Create a new element for the posting user in bold
            const userElement = document.createElement('b');
            userElement.innerText = `${comment.postingUser}: `;

            // Create a new element for the comment text
            const commentElement = document.createElement('span');
            commentElement.innerText = comment.comment;

            // Append the user and comment elements to the child div
            child.appendChild(userElement);
            child.appendChild(commentElement);

            commentBoard.appendChild(child);
        });
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

function getComments() {
    const allPossibleComments = ["I agree!", "Absolutely!", "I couldn't agree more.", "That's a great idea.", "Definitely!", "Absolutely not!", "I'm not so sure about that.", "I strongly disagree.", "I'm not convinced.", "I'm against it.", "I'm for it.", "That's a bad idea.", "I'm against it in principle.", "I'm in favor.", "I'm all for it.", "I'm on board.", "I'm not against it.", "I'm not sure.", "I'm not in favor.", "I'm hesitant.", "I'm not convinced this is a good idea.", "I'm not sure I understand.", "I'm a bit hesitant.", "I'm in agreement.", "I'm in disagreement.", "I'm not so sure.", "I'm not entirely sure.", "I'm cautiously optimistic.", "I'm not sold.", "I'm not a fan.", "I'm not on board.", "I'm all for it.", "I'm totally against it.", "I'm not convinced this is the right way to go.", "I'm not convinced this is the best option.", "I'm not sure this is the right approach.", "I'm open to the idea.", "I'm not in favor of it.", "I'm a bit skeptical.", "I'm not sure this is a good idea.", "I'm not sure this is the best solution.", "I'm not sure if this is the right direction.", "I'm not sure if this is the best way forward.", "I'm unsure.", "I'm on the fence.", "I'm not totally against it.", "I'm not totally in favor of it.", "I'm not sure if this is a good move.", "I'm not sure if this is the right move.", "I'm not sure if this is the best move.", "I'm undecided.", "I'm torn.", "I'm not sure if this is the right choice.", "I'm not sure if this is the best choice.", "I'm not sure if this is the right decision.", "I'm not sure if this is the best decision.", "I'm undecided on this.", "I'm not sure how I feel about this.", "I'm not sure what to think.", "I'm not sure what to make of this."];

    let tmpComments = [];
    for (let i = 0; i < Math.floor(Math.random() * 20) + 1; i++) {
        tmpComments[i] = allPossibleComments[Math.floor(Math.random() * allPossibleComments.length)];
    }

    return tmpComments;

}

function getLargeNumber() {
    return Math.floor(Math.random() * 200) + 1;
}

function getSmallNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

async function generateFakeQuestions() {
    let fakeQuestions = [];

    //First Question
    const firstQuestion = "What tastes better to you: 3am water or McDonald’s sprite? For me personally I think McDonalds sprite taste amazing!! But nothing can beat that feeling of drinking water in the middle of the night.";
    fakeQuestions[0] = new Question(firstQuestion, "Lilyana Blackman", this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Second Question
    const secondQuestion = "Are you guys dark or milk chocolate kind of people? People always say that dark chocalate is better for you, it probably is, I havent researched it, but milk chocolate actually tastes good. I wish I could say that about dark chocolate...";
    fakeQuestions[1] = new Question(secondQuestion, "Michaela Harland", this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Third Question
    const thridQuestion = "Lets say you have leftover pizza in the fridge and you want to eat it. Do you either eat it cold or microwave it? I hope you said eat it cold. WHen you microwave the pizza it becomes all floppy and the cheese becomes nasty. Cold pizza is better.";
    fakeQuestions[2] = new Question(thridQuestion, "Anthony Wilson", this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Fourth Question
    const fourthQuestion = "I am proudly a string cheese peeler. First because it makes the string cheese last longer, and second, only psychopaths bite their string cheese.";
    fakeQuestions[3] = new Question(fourthQuestion, "Helen Cabot", this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Fifth Question
    const fifthQuestion = "Ok ok this is kind of dumb but hear me out- is ketchup a tomato smoothie? I mean why isn't it?";
    fakeQuestions[4] = new Question(fifthQuestion, "Brandon Weatherly", this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Sixth Question
    const sixthQuestion = "This has bugged me ever since I watched the orginal movie. Do the cars in Transformers have life insurance or car insurance? Me personally, I think they have car insurance.";
    fakeQuestions[5] = new Question(sixthQuestion, "Christopher Sowers", this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Seventh Question
    const seventhQuestion = "When you go out to eat for lunch and get a hamburger, sandwich, or whatever. Do you get chips or french fries on the side? Well I hope you said french fries.";
    fakeQuestions[6] = new Question(seventhQuestion, "Natalie Creswell", this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Eight Question
    const eightQuestion = "This is probably the most important question on here. Cats or dogs? I dont personally have anything agaisnt cats but dogs are just do great! They always are happy to see you while cats on the other hand usually run away! Atleast from me.";
    fakeQuestions[7] = new Question(eightQuestion, "Roberta Stinson", this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Nineth Question
    const ninethQuestion = "Would you rather road trip to a destination or fly? Maybe if I was still younger I would say roadtrip- for the memories. But now that I am old, I would say fly, its so much easier and faster.";
    fakeQuestions[8] = new Question(ninethQuestion, "Matthew Marino", this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    for (let i = 0; i < fakeQuestions.length; i++) {
        try {
            const response = await fetch('/api/postQuestion', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(fakeQuestions[i]),
            });


        } catch {

        }

    }



    return fakeQuestions;
}

//generateFakeQuestions();


const questionPage = new QuestionPage();

