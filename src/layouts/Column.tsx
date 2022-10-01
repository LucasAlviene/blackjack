import React, { useMemo } from 'react';

interface ColumnProps {
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
  className?: string
  children?: any
}

const Column: React.FC<ColumnProps> = (props) => {

  const sizes = useMemo<string>(() => {
    let sizeClasses = ''
    sizeClasses += `sm:w-${props.sm ?? 12}/12 `;
    sizeClasses += `md:w-${props.md ?? 12}/12 `;
    sizeClasses += `lg:w-${props.lg ?? 12}/12 `;
    sizeClasses += `xl:w-${props.xl ?? 12}/12 `;
    sizeClasses += `2xl:w-${props.xxl ?? 12}/12 `;
    return sizeClasses
  }, [
    props.sm,
    props.md,
    props.lg,
    props.xl,
    props.xxl
  ])

  return (
    <div className={`layout-column ${sizes} ${props.className ?? ''}`}>
      {props.children}
    </div>
  );
};

export default Column;