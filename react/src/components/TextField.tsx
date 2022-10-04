import React from 'react';

interface TextFieldProps {
  label: string
  setText: StateSetter<string>
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setText(e.target.value)
  }
  return (
    <div className='textfield'>
      <span> {props.label} </span>
      <input type="text" onChange={handleChange} />
    </div>
  );
};

export default TextField;