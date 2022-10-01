import React, { useEffect } from 'react';
import PlayersQueue from '../components/PlayersQueue';
import { useSelector } from '../store/Root.store';

import { onEvent, offEvent } from '../utils/event';

interface WaitingRoomProps {

}

const WaitingRoom: React.FC<WaitingRoomProps> = () => {

  const players = useSelector(state => state.players.players)

  useEffect(() => {
    const listener = (e, data : ResponseServer) => {
      if(data.command == "START"){
        // data.body => As cartas de cada usuário
        // Muda para a sala do jogo 
      }
    };
    onEvent("eventServer", listener)

    return () => offEvent("eventServer", listener);
  }, []);

  return (
    <div className='page page-waiting-room'>
      <div className='container'>
        <PlayersQueue players={players}  />
      </div>
    </div>
  );
};

export default WaitingRoom;