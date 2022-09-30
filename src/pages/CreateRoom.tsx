import React, {useState} from 'react';
import AvatarChooser from '../components/AvatarChooser'

interface CreateRoomProps {
  
}

const CreateRoom: React.FC<CreateRoomProps> = () => {
  const [avatarId, setAvatarId] = useState<number>(1)
  return (
    <div className="page-create-room">
      <AvatarChooser avatarId={avatarId} setAvatarId={setAvatarId}  />
      Name: <input type="text"  />
    </div>
  );
};

export default CreateRoom;