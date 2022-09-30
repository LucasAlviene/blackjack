import React from 'react';

interface WaitingRoomPlayerProps {
  avatar: string
  name: string
}

const WaitingRoomPlayer: React.FC<WaitingRoomPlayerProps> = (props) => {
  return (
    <div>
      <img src={props.avatar} alt={props.name} />
      <span> {props.name} </span>
    </div>
  );
};

export default WaitingRoomPlayer;