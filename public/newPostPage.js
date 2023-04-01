const socket = new SingletonSocket();


function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
}

const postButton = document.querySelector('#postButton');

postButton.addEventListener("click", async function () {
    const questionElement = document.querySelector("#newPostQuestion");
    const newQ = questionElement.value;

    try {
        await saveQuestion(newQ).then(window.location.href = "popularPage.html");
    }
    catch (e) {
        // If there was an error then just track scores locally
        //this.updateScoresLocal(question);
        console.log("An error occured: " + e);
    }


});

async function saveQuestion(question) {
    const userName = getPlayerName();

    const newQuestion = new Question(question, userName, getDateAndTime(), [], 0, 0, 0);

    socket.broadcastEvent(localStorage.getItem('userName'), NewPost, {});

    try {
        const response = await fetch('/api/postQuestion', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newQuestion),
        });



        // Store what the service gave us as the high scores
        //const questions = await response.json();
        //localStorage.setItem('allQuestions', JSON.stringify(questions));
    } catch (e) {
        // If there was an error then just track scores locally
        //this.updateScoresLocal(question);
        console.log("An error occured: " + e);
    }
}

function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

function formatHours(hours) {
    const twelveHourFormat = hours % 12 || 12;
    return twelveHourFormat < 10 ? `0${twelveHourFormat}` : twelveHourFormat;
}

function formatMinutes(minutes) {
    return minutes < 10 ? `0${minutes}` : minutes;
}

function getDateAndTime() {
    const date = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const dateString = `${dayOfWeek}, ${month} ${dayOfMonth}${getDaySuffix(dayOfMonth)} ${year} at ${formatHours(hours)}:${formatMinutes(minutes)}${ampm} EST`;

    return dateString;
}


class PostPage {
    constructor() {
        const playerNameEl = document.querySelector('#player-name');
        playerNameEl.textContent = getPlayerName();

        const postedBy = document.querySelector('.posted-by');
        postedBy.textContent = "Posting as: " + getPlayerName();

        getDateAndTime();

    }
}

const postPage = new PostPage();