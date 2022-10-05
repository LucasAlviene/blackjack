import React, { useState } from 'react';
import PageOptions from '../components/PageOptions'
import Modal from '../components/Modal'
import { useSelector } from '../store/Root.store';

interface MainPageLayoutProps {
  allowExit?: boolean
  className: string
  children: any
}

const MainPageLayout: React.FC<MainPageLayoutProps> = (props) => {
  const { log } = useSelector(state => state.log)
  const [openLog, setOpenLog] = useState<boolean>(false);

  return (
    <div className='main-page-layout'>
      {/* options bar */}
      <PageOptions openLog={() => setOpenLog(true)} allowExit={props.allowExit} />
      {/* content */}
      <div className={`main ${props.className}`}>
        {props.children}
      </div>
      {/* modals */}
      <Modal className='log' open={openLog} onClose={() => setOpenLog(false)}>
        {/* por o log aqui */}
        <ul>

          {log.map((item) => <li>{item}</li>)}
        </ul>
      </Modal>
    </div>
  );
};

export default MainPageLayout;