import React, { useState } from 'react';
import Poll from './utils_for_polls/PollClass';


const PollForm = () => {
  const weatherPoll = new Poll('Погодный опрос', 3, ['Солнечно', 'Облачно', 'Пасмурно']);
  const [poll, setPoll] = useState(weatherPoll);


  const vote = (option) => {
    setPoll(prevPoll => {
      const updatedPoll = new Poll(prevPoll.name_of_a_poll, 0, []);
      updatedPoll.answers = prevPoll.answers.map(answer => ({ ...answer }));

      const answerIndex = updatedPoll.answers.findIndex(answer => answer.option === option);

      if (answerIndex !== -1) {
        updatedPoll.answers[answerIndex].amount++;
      }

      return updatedPoll;
    });
  };


  return (
    <div>
      <h3>{poll.name_of_a_poll}</h3>
      {poll.answers.map(answer => (
        <div key={answer.number}>
          <p>
            {answer.option}{' '}
            <button onClick={() => vote(answer.option)}>Голосовать</button>{' '}
            количество голосов: {answer.amount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PollForm;