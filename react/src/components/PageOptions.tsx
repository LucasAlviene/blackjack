import React from 'react';
import Button from '../components/Button'
import Row from '../layouts/Row'
import Column from '../layouts/Column'
import { ImExit } from 'react-icons/im'
import { BiTerminal } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../store/Root.store';
import { EConnectionType } from '../store/Connection.store';
import { event } from '../utils/event';
import PageLinks from '../pages/PageLinks'

interface PageOptionsProps {
  allowExit?: boolean
  openLog: () => void
}

const PageOptions: React.FC<PageOptionsProps> = (props) => {
  const connection = useSelector(state => state.connection)
  const navigate = useNavigate();
  const exit = () => {
    event("eventClient", ['EXIT']);
    if (connection.type === EConnectionType.SERVER) {
      event("endServer");
    }
    navigate(PageLinks.HOME);
  }

  return (
    <div className='page-options'>
      <div>
        <Button onClick={props.openLog}>
          <BiTerminal />
        </Button>
      </div>
      <div>
        {props.allowExit &&
          <Button onClick={exit}>
            <ImExit />
          </Button>
        }
      </div>
    </div>
  );
};

export default PageOptions;