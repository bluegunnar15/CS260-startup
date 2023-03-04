

class Question {

    constructor(question) {
        this.question = question;

        //This will pool the database
        this.comments = [];
        this.numUpVotes = 8;
        this.numDownVotes = 6;
        this.numUnsureVotes = 1;

        //set display information
        const questionNameElement = document.querySelector('.question-name');
        questionNameElement.textContent = this.question;

        this.chart = this.createChart();
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
