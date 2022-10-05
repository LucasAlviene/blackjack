import React from 'react';
import {MdClose} from 'react-icons/md'
import Button from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: any
  className?: string
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div className={`modal-background ${props.open && 'open'}`}>
      <div className={`modal ${props.className ?? ''}`}>
        <div className='topbar'>
          <Button onClick={props.onClose}><MdClose  /></Button>
        </div>
        <div className='main'>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;