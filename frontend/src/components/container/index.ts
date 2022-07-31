import styled, { css } from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-grow: 1;
`

export const StyledContainer = css`
  border-radius: 14px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  color: black;
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  padding: 16px;
  width: 90vw;
  max-width: 500px;
  height: auto;
  box-sizing: border-box;
`;