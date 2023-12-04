import React, {useContext, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();
  let {authTokens} = useContext(AuthContext);

  const fetchPolls = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/polls', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setPolls(data);
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div>
      <h3>Список опросов:</h3>
      {polls.map((poll) => (
        <div key={poll.poll_id}>
          <Link to={`/polls/${poll.poll_id}`}>{poll.name_of_a_poll}</Link>
        </div>
      ))}
    </div>
  );
};

export default Polls;