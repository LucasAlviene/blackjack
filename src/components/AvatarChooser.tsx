import React, {useEffect} from 'react';
import {
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'

interface AvatarChooserProps {
  avatarId: number
  setAvatarId: StateSetter<number>
}

const AvatarChooser: React.FC<AvatarChooserProps> = (props) => {
  const MAX_IMAGES = 4
  const MIN_IMAGES = 1
  const getImage = (avatarId: ) => 
  useEffect(() => {
    props.setAvatarId(1)
  }, []);
  const handleLeft = (e: React.MouseEvent) => {
    if(props.avatarId === MIN_IMAGES) {
      props.setAvatarId(MAX_IMAGES)
      return
    }
    props.setAvatarId(props.avatarId-1)
  }
  const handleRight = (e: React.MouseEvent) => {
    if(props.avatarId === MAX_IMAGES) {
      props.setAvatarId(MIN_IMAGES)
      return
    }
    props.setAvatarId(props.avatarId+1)
  }
  return (
    <div className='avatar-chooser'>
      <button onClick={handleLeft}> <FaChevronLeft  /> </button>
      <img src={`/images/image${props.avatarId}.png`} alt={String(props.avatarId)} />
      <button onClick={handleRight}> <FaChevronRight  /> </button>
    </div>
  );
};

export default AvatarChooser;