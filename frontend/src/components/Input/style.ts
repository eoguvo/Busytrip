import styled, { css } from 'styled-components';
import { InputProps } from '.';

export const FormFieldWrapper = styled.div`
  position: relative;
`;

export const LabelText = styled.span`
  color: black;
  height: 57px;
  position: absolute; 
  top: 0;
  left: 16px;
  
  display: flex;
  align-items: center;
  
  transform-origin: 0% 0%;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  
  transition: .1s ease-in-out;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin: -30px 0 32px 0;
`

export const Input = styled.input<InputProps>`
  background: #f7f7f7;
  color: black;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 18px;
  
  outline: 0;
  border: 0;
  border-bottom: 4px solid transparent;
  
  padding: 16px;
  margin-bottom: 32px;
  
  resize: none;
  border-radius: 4px;
  transition: border-color .3s;

  ${({ shrink }) => {
    return shrink && css`
        & + ${LabelText} {
          transform: scale(.6) translateY(-10px);
        }
      `;
  }}

  &:focus {
    border-bottom-color: var(--primary);
  }

  &:focus + ${LabelText} {
    transform: scale(.6) translateY(-10px);
  }
`;

export const Label = styled.label`
  display: flex;

  & textarea {
    min-height: 150px;
  }

  &.error ${LabelText} { color: red; }

  &.error ${Input} { outline: 2px solid red; }
`;