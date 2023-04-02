function back() {
    window.location.href = "popularPage.html";
}

const commentButton = document.querySelector('#commentButton');

commentButton.addEventListener("click", async function () {
    postCommentWrapper();
});


const socket = new SingletonSocket();


async function postCommentWrapper() {
    const newCommentInput = document.querySelector("#newComment");
    const newComment = newCommentInput.value;
    newCommentInput.value = null;

    if (!newComment) {
        const modalEl = document.querySelector('#msgModal');
        modalEl.querySelector('.modal-body').textContent = '⚠ Error: Comment field is empty.';
        const msgModal = new bootstrap.Modal(modalEl, {});
        msgModal.show();
        return; // stop execution
    }

    socket.broadcastEvent(localStorage.getItem('userName'), NewComment, {});

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

        pleaseVote.textContent = "Thank you for voting.";
        votingResults.textContent = "";//"Agree: " + this.numUpVotes + " Disagree " + this.numDownVotes + " Unsure: " + this.numUnsureVotes;

        const child = document.createElement('div');
        child.style = "";
        //const test = "<h5 style =\"text-align: center; \"> " + localStorage.getItem('qUpVotes') + " people agree. " + localStorage.getItem('qDownVotes') + " people disagree. " + localStorage.getItem('qUnsureVotes') + " people are unsure. </h5>";

        const test = '<h5 style="text-align: center;"> ' +
            '<span style="background-color: #4CBB17; color: white; padding: 2px;">' +
            localStorage.getItem('qUpVotes') +
            ' people agree</span> | ' +
            '<span style="background-color: #EE4B2B; color: white; padding: 2px;">' +
            localStorage.getItem('qDownVotes') +
            ' people disagree</span> | ' +
            '<span style="background-color: #1F51FF; color: white; padding: 2px;">' +
            localStorage.getItem('qUnsureVotes') +
            ' people are unsure</span></h5>';



        child.innerHTML = test;

        votingBox.appendChild(child);

    }

    displayComments() {
        const commentBoard = document.getElementsByClassName('questionComments')[0];
        const comments = JSON.parse(localStorage.getItem('qComments'));
        console.log(localStorage.getItem('qComments'));

        console.log("comments" + comments);

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
                    display: false,
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
    const numComments = getSmallNumber();
    const fakeComments = [];

    // Create a random user name generator
    const userNames = [
        'Alice',
        'Bob',
        'Charlie',
        'Dave',
        'Eve',
        'Frank',
        'Gina',
        'Henry',
        'Isabella',
        'Jack',
        'Kate',
        'Liam',
        'Mia',
        'Nora',
        'Oliver',
        'Penelope',
        'Quinn',
        'Riley',
        'Samantha',
        'Thomas',
        'Uma',
        'Violet',
        'Wesley',
        'Xander',
        'Yara',
        'Zachary',
        'Adrian',
        'Bianca',
        'Cameron',
        'Diana',
        'Elijah',
        'Fiona',
        'Gavin',
        'Hazel',
        'Isaac',
        'Jasmine',
        'Kendra',
        'Leo',
        'Maggie',
        'Nathan',
        'Oscar',
        'Paige',
        'Quincy',
        'Ryan',
        'Sophie',
        'Tara',
        'Ulrich',
        'Victoria',
        'Wyatt',
        'Ximena',
        'Yvonne',
        'Zane',
        'Avery',
        'Blake',
        'Chloe',
        'David',
        'Emily',
        'Faith',
        'Grace',
        'Hannah',
        'Isabel',
        'Jacob',
        'Katie',
        'Lucy',
        'Matthew',
        'Natalie',
        'Olivia',
        'Peter',
        'Quentin',
        'Rachel',
        'Sara',
        'Taylor',
        'Una',
        'Valerie',
        'William',
        'Xavier',
        'Yolanda',
        'Zoe',
        'Alex',
        'Brooke',
        'Caleb',
        'Danielle',
        'Emma',
        'Felix',
        'Gabriel',
        'Haley',
        'Ian',
        'Julia',
        'Kylie',
        'Landon',
        'Madison',
        'Noah',
        'Owen',
        'Parker',
        'Quinn',
        'Rebecca',
        'Samuel',
        'Tessa',
        'Ursula',
        'Vanessa',
        'Wynter',
        'Xanthe',
        'Yvette',
        'Zara'
    ];

    function getRandomUserName() {
        return userNames[Math.floor(Math.random() * userNames.length)];
    }

    // Create a random comment generator
    const commentList = [
        'That is hilarious!',
        'I totally agree!',
        'LOL!',
        'I had to share that one!',
        'You made my day!',
        'That is such a great idea!',
        'I love this so much!',
        'You are so talented!',
        'This is amazing!',
        'You really nailed it!',
        'This made me smile!',
        'I can\'t stop laughing!',
        'You have a great sense of humor!',
        'Thank you for sharing this!',
        'You are an inspiration!',
        'This is fantastic!',
        'You are so creative!',
        'This is the best thing I\'ve seen all day!',
        'I\'m impressed!',
        'This is pure genius!',
        'You have a great eye for detail!',
        'I\'m so glad I stumbled upon this!',
        'You made my day with this post!',
        'I can\'t wait to try this out!',
        'This is so helpful!',
        'You are a rockstar!',
        'This is a game-changer!',
        'You deserve a standing ovation!',
        'This is so clever!',
        'You have a great perspective on things!',
        'This is so cool!',
        'I\'m in awe of your skills!',
        'You are a master at this!',
        'This is the best thing I\'ve seen all week!',
        'You are so talented and creative!',
        'I\'m sorry, but I don\'t agree with this at all.',
        'This is not helpful in the slightest.',
        'This is a waste of time.',
        'I don\'t see the point of this.',
        'I\'m sorry, but this is just not good.',
        'This is not what I was expecting.',
        'This is disappointing.',
        'I don\'t think this is very useful.',
        'This is not my cup of tea.',
        'I\'m sorry, but I don\'t think this is very well done.',
        'I\'m not impressed.',
        'This is a bit underwhelming.',
        'I think you missed the mark with this.',
        'I don\'t see how this is relevant.',
        'I don\'t think this is very interesting.',
        'This is not very engaging.',
        'I\'m sorry, but I think this is a bit boring.',
        'This is not very insightful.',
        'I don\'t think this is worth my time.',
        'I don\'t see the value in this.',
        'I\'m sorry, but I think this is a bit of a letdown.',
        'This is not very inspiring.',
        'I think you could have done better.',
        'This is not very well thought out.',
        'I\'m sorry, but I\'m not a fan of this.',
        'I don\'t think this is very original.',
        'I\'m not sure what you were trying to achieve with this.',
        'This is not very informative.',
        'I think this is a bit shallow.',
        'I\'m sorry, but I don\'t think this is very good.',
        'Great job!',
        'You are amazing!',
        'I appreciate your work!',
        'This is awesome!',
        'This is fantastic!',
        'You are so talented!',
        'Thank you for sharing this!',
        'I can\'t wait to try this out!',
        'You have a great perspective on things!',
        'I\'m in love with this post!',
        'You made my day!',
        'This is so creative!'
    ];

    function getRandomComment() {
        return commentList[Math.floor(Math.random() * commentList.length)];
    }

    // Generate fake comments
    for (let i = 0; i < numComments; i++) {
        const fakeComment = {
            postingUser: getRandomUserName(),
            comment: getRandomComment(),
        };
        fakeComments.push(fakeComment);
    }

    return fakeComments;
}


function getLargeNumber() {
    return Math.floor(Math.random() * 200) + 1;
}

function getSmallNumber() {
    return Math.floor(Math.random() * 10) + 1;
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

async function generateFakeQuestions() {
    console.log("Generating");
    let fakeQuestions = [];

    //First Question
    const firstQuestion = "What tastes better to you: 3am water or McDonald’s sprite? For me personally I think McDonalds sprite taste amazing!! But nothing can beat that feeling of drinking water in the middle of the night.";
    fakeQuestions[0] = new Question(firstQuestion, "Lilyana Blackman", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Second Question
    const secondQuestion = "Are you guys dark or milk chocolate kind of people? People always say that dark chocalate is better for you, it probably is, I havent researched it, but milk chocolate actually tastes good. I wish I could say that about dark chocolate...";
    fakeQuestions[1] = new Question(secondQuestion, "Michaela Harland", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Third Question
    const thridQuestion = "Lets say you have leftover pizza in the fridge and you want to eat it. Do you either eat it cold or microwave it? I hope you said eat it cold. WHen you microwave the pizza it becomes all floppy and the cheese becomes nasty. Cold pizza is better.";
    fakeQuestions[2] = new Question(thridQuestion, "Anthony Wilson", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Fourth Question
    const fourthQuestion = "I am proudly a string cheese peeler. First because it makes the string cheese last longer, and second, only psychopaths bite their string cheese.";
    fakeQuestions[3] = new Question(fourthQuestion, "Helen Cabot", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Fifth Question
    const fifthQuestion = "Ok ok this is kind of dumb but hear me out- is ketchup a tomato smoothie? I mean why isn't it?";
    fakeQuestions[4] = new Question(fifthQuestion, "Brandon Weatherly", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Sixth Question
    const sixthQuestion = "This has bugged me ever since I watched the orginal movie. Do the cars in Transformers have life insurance or car insurance? Me personally, I think they have car insurance.";
    fakeQuestions[5] = new Question(sixthQuestion, "Christopher Sowers", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Seventh Question
    const seventhQuestion = "When you go out to eat for lunch and get a hamburger, sandwich, or whatever. Do you get chips or french fries on the side? Well I hope you said french fries.";
    fakeQuestions[6] = new Question(seventhQuestion, "Natalie Creswell", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Eight Question
    const eightQuestion = "This is probably the most important question on here. Cats or dogs? I dont personally have anything agaisnt cats but dogs are just do great! They always are happy to see you while cats on the other hand usually run away! Atleast from me.";
    fakeQuestions[7] = new Question(eightQuestion, "Roberta Stinson", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    //Nineth Question
    const ninethQuestion = "Would you rather road trip to a destination or fly? Maybe if I was still younger I would say roadtrip- for the memories. But now that I am old, I would say fly, its so much easier and faster.";
    fakeQuestions[8] = new Question(ninethQuestion, "Matthew Marino", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    const tenthQuestion = "I absolutely love pancakes for breakfast and I think they are far superior to waffles. There's just something about the fluffy, soft texture of a pancake that can't be beat. Plus, you can get so creative with toppings - from classic butter and syrup to fresh fruit and whipped cream. And let's not forget about the perfect stack, where each pancake soaks up just the right amount of syrup. Waffles may have those fancy ridges, but when it comes down to it, nothing beats a warm, delicious pancake to start your day off right.";
    fakeQuestions[9] = new Question(tenthQuestion, "Sophie Mitchell", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    const elQuestion = "As a pizza lover, I simply cannot fathom the idea of putting pineapple on a perfectly good pizza. The sweetness of the pineapple just doesn't belong on a savory dish like pizza, it's just wrong. It's like mixing oil and water, they just don't go together. The cheese, tomato sauce, and toppings all work together in harmony to create a delicious balance of flavors, and the addition of pineapple just throws everything off. In my opinion, pineapple belongs in a fruit salad, not on a pizza.";
    fakeQuestions[10] = new Question(elQuestion, "Emily Adams", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    const twQuestion = "In my opinion, showering at night is much better than showering in the morning. Not only does it wash off all the dirt and sweat from the day, but it also helps me to relax and unwind before going to bed. There's something about the warm water and steam that helps me to feel more calm and comfortable, making it easier to fall asleep. Additionally, I find that showering at night saves me time in the morning since I don't have to worry about washing my hair or taking a long shower before starting my day. Overall, I think showering at night is a great way to end the day and prepare for a good night's sleep.";
    fakeQuestions[11] = new Question(twQuestion, "Jared Rodriguez", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    const thQuestion = "As a passionate foodie, I'm always up for a good debate on what constitutes a sandwich. And I have to say, I firmly believe that a hotdog is indeed a sandwich. Hear me out: you've got a filling (the sausage) between two pieces of bread (the bun), held together and easily eaten by hand. Sure, the bun is connected at one end, but that's just a minor detail. And if we consider open-faced sandwiches as valid, why not a hotdog? So let's not discriminate against hotdogs and give them the respect they deserve as a classic sandwich option.";
    fakeQuestions[12] = new Question(thQuestion, "Andrew Mitchell", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

    const thoQuestion = "Some people pronounce the word \"caramel\" with two syllables, while others use three. As someone who pronounces it with three syllables, I believe that this is the correct way to say it. The extra syllable adds a richness to the word and emphasizes the sweetness of the caramel flavor.";
    fakeQuestions[13] = new Question(thoQuestion, "Tyler Johnson", getDateAndTime(), this.getComments(), this.getLargeNumber(), this.getLargeNumber(), this.getSmallNumber());

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

