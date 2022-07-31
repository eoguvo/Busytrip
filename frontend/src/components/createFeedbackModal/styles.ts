import styled from "styled-components";


export const Title = styled.h1`
  font-size: 1.625rem;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -1px;
  margin: 32px 0 16px 0;
`;

export const AddButton = styled.button`
  border: 1px dashed var(--primary);
  background-color: transparent;
  color: var(--primary);
  font-weight: bold;
  border-radius: .6rem;
  padding: 1rem 0;
  transition: all .3s ease-in-out;

  &:hover {
    background-color: var(--primary);
    color: #fff;
  }
`;

export const ModalTitle = styled(Title)`
  margin: 16px 0;
`;

export const SubmitButton = styled.button`
  background-color: var(--primary);
  color: #fff;
  font-weight: bold;
  border-radius: .6rem .6rem 0 0;
  padding: 1rem 0;
  width: 100%;
  transition: all .3s ease-in-out;

  &:disabled {
    opacity: .7;
  }

  &:hover { filter: brightness(85%) }
`;

export const CloseButton = styled(AddButton)`
  border-radius: 0 0 .6rem .6rem;
  width: 100%;
`;

