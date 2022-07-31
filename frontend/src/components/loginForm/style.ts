import styled from "styled-components";
import { StyledContainer } from "../container";
import { Form as Unform } from '@unform/web';

export const Title = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  line-height: 2rem;
  margin: 8px 0 32px 0;
`;

export const Button = styled.button`
  background-color: var(--primary);
  color: #fff;
  font-weight: bold;
  border-radius: .6rem;
  padding: 1rem 0;

  &:disabled {
    opacity: .7;
  }
`;

export const Form = styled(Unform)`
  ${StyledContainer}`;