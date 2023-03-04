
class Question {

    constructor(question) {
        this.question = question;

        //This will pool the database
        this.comments = [];
        this.numUpVotes = 4;
        this.numDownVotes = 6;

        //set display information
        const questionNameElement = document.querySelector('.question-name');
        questionNameElement.textContent = this.question;
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

new Chart(document.getElementById("pie-chart"), {
    type: 'pie',

    data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: [2478, 5267, 734, 784, 433]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Predicted world population (millions) in 2050',
            legend: {
                position: 'left'
            },
            layout: {
                padding: {
                    left: 30,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        }
    }
});