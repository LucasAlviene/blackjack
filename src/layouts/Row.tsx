import React from 'react';

interface RowProps {
  className?: string
  children?: any
}

const Row: React.FC<RowProps> = (props) => {
  return (
    <div className={`layout-row ${props.className ?? ''}`}>
      {props.children}
    </div>
  );
};

export default Row;