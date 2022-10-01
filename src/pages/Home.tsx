import React from 'react';
import Button from '../components/Button'
import Row from '../layouts/Row'
import Column from '../layouts/Column'

import {Link} from 'react-router-dom'
import PageLinks from './PageLinks'

interface HomeProps {
  
}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="page page-home">
      <div className="container">
        <Row>
          <Column className='flex-center'>
            <h1> Blackjack </h1>
          </Column>
        </Row>
        <Row>
          <Column className='flex-center'>
            <Button link={PageLinks.CREATE_ROOM}>
              Criar novo jogo
            </Button>
          </Column>
        </Row>
        <Row>
          <Column className='flex-center'>
            <Button link={PageLinks.JOIN_ROOM}>
              Juntar-se a um jogo
            </Button>
          </Column>
        </Row>
      </div>
    </div>
  );
};

export default Home;