import React from 'react';
import { InputWithLabelProps } from '../types';
import styled from 'styled-components';

const StyledLabel = styled.label`
  border-top: 1px solid #171212;
  border-left: 1px solid #171212;
  padding-left: 5px;
  font-size: 24px;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;
  
  font-size: 24px;
`;

const InputWithLabel = ({id, value, type="text", onInputChange, isFocused, children}: InputWithLabelProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    const current = inputRef.current;
    if (isFocused && current) {
      current.focus();
    }
  }, [isFocused]);

  return (
    <>
        <StyledLabel htmlFor={id} className="label">{children}</StyledLabel>
        <StyledInput
          ref={inputRef}
          id={id}
          type={type || "text"}
          value={value}
          className="input"
          onChange={onInputChange} />
    </>
  );
}

export default InputWithLabel;