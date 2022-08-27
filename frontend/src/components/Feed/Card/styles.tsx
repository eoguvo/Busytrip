import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Card = styled(motion.a)`
  display: inline-block;
  padding: 16px;
  transition: .3S all ease-in-out;
  border-radius: 16px;
  position: relative;
  z-index: 1;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`

export const Image = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: flex;
  background-color: #D9D9D9;
  margin: 8px 0;
  border-radius: 16px;
`

export const Company = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
  font-size: 1rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Distance = styled.small`
  
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: .8rem;
  line-height: 19px;

  color: #808080;
`;

export const Description = styled.p`
  margin: 8px 0;
`;