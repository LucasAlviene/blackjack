import React from 'react';
import { PlayerData } from '../store/Players.store';

interface RoomPlayerProps {
  player: PlayerData
}

const RoomPlayer: React.FC<RoomPlayerProps> = (props) => {
  return (
    <div className='room-player'>
      <div>
        <img src={props.player.avatar} alt={props.player.name} />
        <span>{props.player.name}</span>
      </div>
      <div>
        {props.player.cards.map(card => {
          return (
            <img src={`${card.suit}-${card.number}.png`} alt={`${card.suit} ${card.number}`} />
          )
        })}
      </div>
    </div>
  );
};

export default RoomPlayer;