import React from 'react';
import {Link} from 'react-router-dom'
import PageLinks from './PageLinks'

interface HomeProps {
  
}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="page-home">
      <div>
        <h1> Blackjack </h1>
      </div>
      <div>
        <ul>
          <li> <Link to={PageLinks.CREATE_ROOM}> Criar novo jogo </Link> </li>
          <li> <Link to={PageLinks.JOIN_ROOM}> Juntar-se a um jogo </Link> </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;