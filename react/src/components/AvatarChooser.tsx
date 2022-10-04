import React, { useState, useEffect } from 'react';
import {
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'

interface AvatarChooserProps {
  setAvatarPath: StateSetter<string>
}

const AvatarChooser: React.FC<AvatarChooserProps> = (props) => {
  const MAX_IMAGES = 4
  const MIN_IMAGES = 1
  const getAvatarPath = (avatarId: number) => (process.env.NODE_ENV == "development" ? '' : window.__dirname) + `/images/image${avatarId}.png`
  const [avatarId, setAvatarId] = useState<number>(1)
  useEffect(() => {
    props.setAvatarPath(getAvatarPath(avatarId))
  }, [avatarId]);
  const handleLeft = (e: React.MouseEvent) => {
    if (avatarId === MIN_IMAGES) {
      setAvatarId(MAX_IMAGES)
      return
    }
    setAvatarId(avatarId - 1)
  }
  const handleRight = (e: React.MouseEvent) => {
    if (avatarId === MAX_IMAGES) {
      setAvatarId(MIN_IMAGES)
      return
    }
    setAvatarId(avatarId + 1)
  }

  return (
    <div className='avatar-chooser'>
      <button onClick={handleLeft}> <FaChevronLeft /> </button>
      <img src={getAvatarPath(avatarId)} alt={String(avatarId)} />
      <button onClick={handleRight}> <FaChevronRight /> </button>
    </div>
  );
};

export default AvatarChooser;