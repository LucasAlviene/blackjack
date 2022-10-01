import React from 'react';
import {PlayerData} from '../store/Players.store'
import WaitingRoomPlayer from './WaitingRoomPlayer';

interface PlayersQueueProps {
  players: PlayerData[]
}

const PlayersQueue: React.FC<PlayersQueueProps> = (props) => {
  return (
    <div className='players-queue'>
      {props.players.map((player) => {
        return <WaitingRoomPlayer player={player}  />
      })}
    </div>
  );
};

export default PlayersQueue;