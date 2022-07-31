import styled from "styled-components";

export const Stars = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 3s ease-in-out;

  filter: drop-shadow(0px 0px 0 transparent);

  &.on svg { filter: drop-shadow(0px 0px 3px #E7A74E); }
`;

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

export const StarRatingWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;