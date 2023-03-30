class Question {

    constructor(question, user, comments, upVotes, downVotes, unsureVotes) {
        this.question = question;
        this.user = user;
        this.comments = comments;
        this.numUpVotes = upVotes;
        this.numDownVotes = downVotes;
        this.numUnsureVotes = unsureVotes;
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

    addComment(newComment) {
        this.comments.push(newComment);
    }


}