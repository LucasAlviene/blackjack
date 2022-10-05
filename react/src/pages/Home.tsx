import React from 'react';
import Button from '../components/Button'
import Row from '../layouts/Row'
import Column from '../layouts/Column'
import MainPageLayout from '../layouts/MainPageLayout'

import {useNavigate} from 'react-router-dom'
import PageLinks from './PageLinks'

interface HomeProps {
  
}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate()
  return (
    <MainPageLayout className="page page-home">
      <div className="container">
        <Row>
          <Column className='flex-center'>
            <h1> Blackjack </h1>
          </Column>
        </Row>
        <Row>
          <Column className='flex-center'>
            <Button onClick={() => navigate(PageLinks.CREATE_ROOM)}>
              Criar novo jogo
            </Button>
          </Column>
        </Row>
        <Row>
          <Column className='flex-center'>
            <Button onClick={() => navigate(PageLinks.JOIN_ROOM)}>
              Juntar-se a um jogo
            </Button>
          </Column>
        </Row>
      </div>
    </MainPageLayout>
  );
};

export default Home;