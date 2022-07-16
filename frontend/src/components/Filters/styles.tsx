import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  text-align: center;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
`

export const Item = styled.div`
  display: flex;
  color: #FF5A5F;
  font-weight: 700;
  font-size: 2rem;
  & p {
    align-self: center;
  }
`;

export const ButtonWrapper = styled.button`
  color: black;
  text-decoration: none;
  padding: 8  px 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;