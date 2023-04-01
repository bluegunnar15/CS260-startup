class Question {

    constructor(question, user, timePosted, comments, upVotes, downVotes, unsureVotes) {
        this.question = question;
        this.user = user;
        this.timePosted = timePosted;
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