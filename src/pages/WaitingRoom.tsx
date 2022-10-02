import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLinks from './PageLinks'
import PlayersQueue from '../components/PlayersQueue';
import Button from '../components/Button'
import Row from '../layouts/Row'
import Column from '../layouts/Column'
import { useSelector, useDispatch } from '../store/Root.store';
import { addPlayer, removePlayer } from '../store/Players.store';
import { EConnectionType } from '../store/Connection.store';
import { event, onEvent, offEvent } from '../utils/event';

interface WaitingRoomProps {

}

const WaitingRoom: React.FC<WaitingRoomProps> = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const players = useSelector(state => state.players.players)
  const connection = useSelector(state => state.connection)
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const listener = (e, data: ResponseServer) => {
      switch (data.command) {
        case "START":
          navigate(PageLinks.ROOM);
          // Muda para a sala do jogo 
          break;
        case "PLAYERS":
          if (data.body) {
            for (let i = 0; i < data.body.length; i += 3) {
              const id = data.body[i];
              const name = data.body[i + 1];
              const avatar = data.body[i + 2];
              dispatch(addPlayer({ id: Number(id), name, avatar, cards: [], value: 0 }));
            }
          }
          break;
        case "JOIN":
          if (data.body) {
            const [id, name, avatar] = data.body;
            dispatch(addPlayer({ id: Number(id), name, avatar, cards: [], value: 0 }));
          }
          break;
        case "EXIT":
          if (data.body) {
            const [id] = data.body;
            dispatch(removePlayer(Number(id)));
          }
          break;
      }
    };
    onEvent("eventServer", listener)
    if (connection.type === EConnectionType.CLIENT) event("eventClient", ['PLAYERS']);

    return () => offEvent("eventServer", listener);
  }, []);

  useEffect(() => {
    setReady(players.length > 1)
  }, [players]);

  return (
    <div className='page page-waiting-room'>
      <div className='container'>
        <Row>
          <Column className='flex-center'>
            <PlayersQueue players={players} />
          </Column>
        </Row>
        <Row>
          <Column md={6} lg={3} xl={3} xxl={3} className='flex-center'>
            IP: {connection.ip}
          </Column>
          <Column md={6} lg={3} xl={3} xxl={3} className='flex-center'>
            Port: {connection.port}
          </Column>
        </Row>
        {connection.type === EConnectionType.SERVER &&
          <Row>
            <Column className='flex-center'>
              <Button onClick={() => event("eventClient", ['START'])} disabled={!ready}>
                Começar
              </Button>
            </Column>
          </Row>
        }
      </div>
    </div>
  );
};

export default WaitingRoom;