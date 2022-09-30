import React, {useState} from 'react';
import {
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'

interface CreateRoomProps {
  
}

const CreateRoom: React.FC<CreateRoomProps> = () => {
  const [avatarId, setAvatarId] = useState<number>(1);
  return (
    <div className="page-create-room">
      <div>
        <FaChevronLeft  />
        <img src={`/images/image${avatarId}.png`} alt={String(avatarId)} />
        <FaChevronRight  />
      </div>
      Name: <input type="text"  />
    </div>
  );
};

export default CreateRoom;