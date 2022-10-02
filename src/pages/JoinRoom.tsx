import React, { useState } from 'react';

import AvatarChooser from '../components/AvatarChooser'
import TextField from '../components/TextField'
import Button from '../components/Button'
import Row from '../layouts/Row'
import Column from '../layouts/Column'
import { event } from '../utils/event';
import { useNavigate } from 'react-router-dom';
import PageLinks from './PageLinks';
import {useDispatch} from '../store/Root.store'
import {connectAsClient} from '../store/Connection.store'

interface JoinRoomProps {

}

const JoinRoom: React.FC<JoinRoomProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatarPath, setAvatarPath] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [ip, setIp] = useState<string>('')
  const [port, setPort] = useState<string>('')
  const handleClick = () => {
    event("joinServer", [ip, port, name, avatarPath], () => {
      // Vai para a sala de espera
      dispatch(connectAsClient({ip: "", port: ""}))
      navigate(PageLinks.WAITING_ROOM);
    });
    console.log('clicked')
  }
  return (
    <div className="page page-join-room">
      <div className="container">
        <Row>
          <Column className='flex-center'>
            <h2> Juntar-se a um jogo </h2>
          </Column>
        </Row>
        <Row>
          <Column className='flex-center'>
            <AvatarChooser setAvatarPath={setAvatarPath} />
          </Column>
        </Row>
        <Row>
          <Column className='flex-center'>
            <TextField label="Nome" setText={setName} />
          </Column>
        </Row>
        <Row>
          <Column className='flex-center'>
            <TextField label="IP" setText={setIp} />
          </Column>
        </Row>
        <Row>
          <Column className='flex-center'>
            <TextField label="Port" setText={setPort} />
          </Column>
        </Row>
        <Row>
          <Column className='flex-center'>
            <Button onClick={handleClick} >
              Juntar-se
            </Button>
          </Column>
        </Row>
      </div>
    </div>
  );
};

export default JoinRoom;