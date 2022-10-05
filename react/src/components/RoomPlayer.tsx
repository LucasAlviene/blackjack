import React from 'react';
import { PlayerData } from '../store/Players.store';
import getAvatar from '../utils/getAvatar';
import getCardImage from '../utils/getCardImage'

interface RoomPlayerProps {
  player: PlayerData
  currentTurnPlayerId: number
}

const RoomPlayer: React.FC<RoomPlayerProps> = (props) => {
  return (
    <div className='room-player'>
      <div>
        <img src={getAvatar(props.player.avatar)} alt={props.player.name} />
        <div>
          <h4>{props.player.name}</h4>
          <br />
          <span>{props.player.value} + ? / 21</span>
          <br />
          {props.player.id === props.currentTurnPlayerId && <span>TURNO</span>}
        </div>
      </div>
      <div>
        {props.player.cards.map((card, i) => {
          return (
            <img key={i} src={getCardImage(card.suit, card.number, i === 0)} alt={`${card.suit} ${card.number}`} />
          )
        })}
      </div>
    </div>
  );
};

export default RoomPlayer;