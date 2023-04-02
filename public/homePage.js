
const socket = new SingletonSocket();

class HomePage {

    constructor() {
        const welcomeEl = document.querySelector('#welcomeSign');
        welcomeEl.textContent = "Welcome " + localStorage.getItem('userName') + " to DumbQuestions!";


        const playerNameEl = document.querySelector('#player-name');
        playerNameEl.textContent = this.getPlayerName();
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }

}


const page = new HomePage();

function fetchJoke() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '<h1 id="welcomeSign" style="font-weight: bold; padding: 2%;">Welcome to the Dad Joke Generator!</h1>';



    // Make a GET request to the API endpoint
    fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            // Display the joke on the page
            document.getElementById('joke').innerHTML = data.joke;
        })
        .catch(error => {
            // Display an error message if the request fails
            alert('Failed to fetch joke: ' + error.message);
        });
}

//page.broadcastEvent(localStorage.getItem('userName'), GameStartEvent, {});

