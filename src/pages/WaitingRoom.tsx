import React, { useEffect } from 'react';

import { onEvent, offEvent } from '../utils/event';

interface WaitingRoomProps {

}

const WaitingRoom: React.FC<WaitingRoomProps> = () => {

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

      </div>
    </div>
  );
};

export default WaitingRoom;