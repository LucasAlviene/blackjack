import React from 'react';
import { PlayerData } from '../store/Players.store';

interface WaitingRoomPlayerProps {
  player: PlayerData
}

const WaitingRoomPlayer: React.FC<WaitingRoomPlayerProps> = (props) => {
  return (
    <div className="waiting-room-player">
      <img src={props.player.avatar} alt={props.player.name} />
      <span> {props.player.name} </span>
    </div>
  );
};

export default WaitingRoomPlayer;