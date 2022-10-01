import React,{useEffect} from 'react';

import { onEvent, offEvent } from '../utils/event';

interface RoomProps {
}

const Room: React.FC<RoomProps> = () => {

  useEffect(() => {
    const listener = (e, data : ResponseServer) => {
      switch(data.command){
        case "PLAYER":
          // Informação do jogador
          // [id, name, avatar]
          // Ex: [1, "João", "..jpg"]
        break;
        case "STAND":
          // Próximo jogador
          // [id]
          // Ex: [1]
        break;
        case "HAND":
          // Mão dos jogadores
          // [id do jogador,cartas]
          // Ex:  [1, "xx_xx_xx|xx_xx_xx"]
        break;
        case "DRAW":
          // Jogdor que irá comprou uma carta
          // [id,hand,sumHand]
          // Ex: [1,"xx_xx_xx|xx_xx_xx",20]
        break;
        case "EXIT":
          // Jogdor que saiu
          // [id]
          // Ex: [1]
        break;
        case "WIN":
          // Jogdor que ganhou
          // [id]
          // Ex: [1]
        break;
        case "LOST":
          // Jogdor que perdeu
          // [id]
          // Ex: [1]
        break;
      }
    };
    onEvent("eventServer", listener)

    return () => offEvent("eventServer", listener);
  }, []);


  return (
    <div className='page-room'>

    </div>
  );
};

export default Room;