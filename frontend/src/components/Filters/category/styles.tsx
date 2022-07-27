import styled from 'styled-components';

export const CategoryWrapper = styled.div`
  padding: 8px 12px;
  margin: 0 12px;
  opacity: .4;

  transition: opacity .3s ease-in-out;

  &.active {
    opacity: 1;
    border-bottom: 2px solid black;
  }

  &:hover {
    opacity: 1;
    border-bottom: 2px solid rgba(0, 0, 0, .7);
  }
`