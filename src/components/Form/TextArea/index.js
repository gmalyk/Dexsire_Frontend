import React, { useEffect, useRef, useState } from 'react';
import { TextArea } from './styled';


export default function InputTextArea({ value, onChange, disabled }) {
  const [text, setText] = useState(value);

  const handleTextChange = (event) => {
    setText(event.target.value);
    if (onChange) onChange(event.target.value);
  };


  return (
    <TextArea
      value={text}
      onChange={handleTextChange}
      disabled={disabled}
    />
  );
}