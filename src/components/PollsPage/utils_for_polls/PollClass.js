class Answer {
  constructor(number, option) {
    this.number = number;
    this.option = option;
    this.amount = 0;
  }
}

class Poll {
  constructor(poll_id, question, answers, creator_by_id, created_at, redacted_at) {
    this.poll_id = poll_id;
    this.question = question;
    this.answers = answers.map((option, index) => new Answer(index + 1, option));
    this.creator = creator_by_id;
    this.created_at = created_at;
    this.redacted_at = redacted_at;
  }
}

export default Poll;