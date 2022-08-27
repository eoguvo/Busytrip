import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Timeline = styled(motion.div)`
  display: grid;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 32px;

  grid-template-columns: var(--breakpoint-grid_column-template, repeat(var(--breakpoint-grid_columns,1),minmax(0,1fr)) );
  @media (min-width: 550px) {
    --breakpoint-grid_columns: 2;
  }
  @media (min-width: 950px) {
    --breakpoint-grid_columns: 3;
  }
  @media (min-width: 1128px) {
    --breakpoint-grid_columns: 4;
  }
`