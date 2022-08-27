import styled, { css } from "styled-components";
import { StyledContainer } from "../container";

export const CompanyContainer = styled.div`
  width: 100%;
`;

export const Body = styled.div`
  max-width: 100%;
  padding: 32px 64px;
  display: flex;
  flex-direction: column;
`;

interface ContentTagProps {
  direction: string;
}
export const Content = styled.div.attrs((props: ContentTagProps) => ({
  direction: props.direction || 'row',
}))`
  display: flex;
  ${({ direction }) => css`flex-direction: ${direction}`}
`;

export const HeroImg = styled.img`
  background-color: #C5C5C5;
  width: 100vw;
  height: 30vw;
  max-height: 300px;
  object-fit: cover;
`;

export const Logo = styled.img`
  background-color: #C5C5C5;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const Title = styled.h1`
  font-size: 1.625rem;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: -1px;
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

export const Rating = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.625rem;
  font-weight: bold;
  color: #E7A74E;
  margin-left: 8px;
`;