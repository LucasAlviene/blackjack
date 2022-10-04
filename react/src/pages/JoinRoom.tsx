import React, { useState } from 'react';

import AvatarChooser from '../components/AvatarChooser'
import TextField from '../components/TextField'
import Button from '../components/Button'
import Row from '../layouts/Row'
import Column from '../layouts/Column'
import { event, onEvent, offEvent } from '../utils/event';
import { useNavigate } from 'react-router-dom';
import PageLinks from './PageLinks';
import { useDispatch } from '../store/Root.store'
import { connectAsClient } from '../store/Connection.store'
import { createUser } from '../store/Players.store';

interface JoinRoomProps {

}

const JoinRoom: React.FC<JoinRoomProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<string>('')
  const [name, setName] = useState<string>('Juliano')
  const [ip, setIp] = useState<string>('')
  const [port, setPort] = useState<string>('500')
  const handleClick = () => {
    event("joinServer", [ip, port, name, avatar], () => {
      // Vai para a sala de espera
    });
    const listener = (e, data: ResponseServer) => {
      if (data.command == "HANDSHAKE" && data.body) {
        const id = Number(data.body[0]);
        dispatch(createUser({ id, name, avatar, cards: [], value: 0 }))
        dispatch(connectAsClient({ ip: "", port: "" }))
        navigate(PageLinks.WAITING_ROOM);
      }
    }
    onEvent("eventServer", listener);
    () => offEvent("eventServer", listener);
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
            <AvatarChooser setAvatarPath={setAvatar} />
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