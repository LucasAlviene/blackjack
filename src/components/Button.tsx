import React from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

interface ButtonProps {
  onClick?: () => void
  loading?: boolean
  children?: any
}

const Button: React.FC<ButtonProps> = (props) => {
  const handleClick = (e: React.MouseEvent) => {
    if(!props.loading) {
      props.onClick?.()
    }
  }

  return (
    <button className={`button ${props.loading && 'loading'}`} onClick={handleClick}>
      {props.loading ? <AiOutlineLoading3Quarters  /> : props.children}
    </button>
  );
};

export default Button;