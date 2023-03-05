function newPostWrapper() {
    //handle posting logic here

    window.location.href = "popularPage.html";
}


class PostPage {
    constructor() {
        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();

        const postedBy = document.querySelector('.posted-by');
        postedBy.textContent = "Posting as: " + this.getPlayerName();


    }


    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
}

const postPage = new PostPage();