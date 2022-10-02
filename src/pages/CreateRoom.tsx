import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarChooser from '../components/AvatarChooser'
import TextField from '../components/TextField'
import Button from '../components/Button'
import Row from '../layouts/Row'
import Column from '../layouts/Column'
import PageLinks from './PageLinks';
import { useDispatch } from '../store/Root.store';
import { connectAsServer } from '../store/Connection.store';

import { event } from '../utils/event';

interface CreateRoomProps {

}

const CreateRoom: React.FC<CreateRoomProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatarPath, setAvatarPath] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const handleClick = () => {
    setLoading(true)
    //dispatch(test())
    event("startServer", [], (e) => {
      event("joinServer", ['localhost', 5000, name, avatarPath], (e) => {
        dispatch(connectAsServer({ip: "", port: ""}))
        navigate(PageLinks.WAITING_ROOM);
      });
    });
  }
  return (
    <div className="page page-create-room">
      <div className="container">
        <Row>
          <Column className='flex-center'>
            <h2> Criar uma sala </h2>
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
            <Button onClick={handleClick} loading={loading}>
              Criar sala
            </Button>
          </Column>
        </Row>
      </div>
    </div>
  );
};

export default CreateRoom;