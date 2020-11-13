import React, { ChangeEvent, ReactChildren } from 'react';
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

type InputWithLabelProps = {
  id: string;
  value: string;
  type: string;
  isFocused: boolean;
  children: Array<ReactChildren>,
  onInputChange: ChangeEvent<HTMLElement>
}

const InputWithLabel = (props: InputWithLabelProps) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    const current = inputRef.current;
    if (props.isFocused && current) {
      current.focus();
    }
  }, [props.isFocused]);

  return (
    <>
        <StyledLabel htmlFor={props.id} className="label">{props.children}</StyledLabel>
        <StyledInput
          ref={inputRef}
          id={props.id}
          type={props.type || "text"}
          value={props.value}
          className="input"
          onChange={props.onInputChange} />
    </>
  );
}

export default InputWithLabel;