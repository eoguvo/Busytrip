import styled from "styled-components";

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 32px;
`;

export const Feedback = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;

  & + & {
    border-top: 1px solid #eaeaea;
  }
`;

export const Heading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const Name = styled.h1`
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -1px;
  margin-right: 16px;
`;

export const Rating = styled.p`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  color: #E7A74E;
`;

export const DateElement = styled.h1`
  margin-left: 8px;
  font-size: 13px;
  font-weight: 300;
  color: gray;
  letter-spacing: -1px;
`;

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