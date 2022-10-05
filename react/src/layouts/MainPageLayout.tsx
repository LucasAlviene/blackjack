import React from 'react';
import PageOptions from '../components/PageOptions'

interface MainPageLayoutProps {
  allowExit?: boolean
  className: string
  children: any
}

const MainPageLayout: React.FC<MainPageLayoutProps> = (props) => {
  return (
    <div className='main-page-layout'>
      {/* options bar */}
      <PageOptions allowExit={props.allowExit}  />
      {/* content */}
      <div className={`main ${props.className}`}>
        {props.children}
      </div>
    </div>
  );
};

export default MainPageLayout;