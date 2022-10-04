import React from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

interface ButtonProps {
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  children?: any
}

const Button: React.FC<ButtonProps> = (props) => {
  const handleClick = (e: React.MouseEvent) => {
    if(!props.loading && !props.disabled) {
      props.onClick?.()
    }
  }

  const loading: boolean = (!!props.loading && !props.disabled)

  return (
    <button className={`button ${loading && 'loading'} ${props.disabled && 'disabled'}`} onClick={handleClick}>
      {loading ? <AiOutlineLoading3Quarters  /> : props.children}
    </button>
  );
};

export default Button;