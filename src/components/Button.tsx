import React from 'react';
import {Link} from 'react-router-dom'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

interface ButtonProps {
  link?: string
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

  if(props.link) {
    return (
      <button className='button' onClick={handleClick}>
        <Link to={props.link}>
          {props.children}
        </Link>
      </button>
    );
  }

  return (
    <button className={`button ${props.loading && 'loading'}`} onClick={handleClick}>
      {props.loading ? <AiOutlineLoading3Quarters  /> : props.children}
    </button>
  );
};

export default Button;