class Answer {
  constructor(number, option) {
    this.number = number;
    this.option = option;
    this.amount = 0;
  }
}

class Poll {
  constructor(name_of_a_poll, numAnswers, answerOptions) {
    this.name_of_a_poll = name_of_a_poll;
    this.answers = [];

    for (let i = 0; i < numAnswers; i++) {
      const answer = new Answer(i + 1, answerOptions[i]);
      this.answers.push(answer);
    }
  }
}

export default Poll;