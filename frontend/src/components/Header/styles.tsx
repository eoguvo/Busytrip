import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  text-align: center;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
`

export const Logo = styled(Link)`
  display: flex;
  color: #FF5A5F;
  font-weight: 700;
  font-size: 2rem;
  & p {
    align-self: center;
  }
`;

export const Sign = styled(Link)`
  color: black;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 1rem;
  transition: all .3s ease-in-out;
  &:hover {
    background-color: #f7f7f7;
  }
`;