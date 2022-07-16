import styled from "styled-components";

function HeartIcon({ stroke = "currentColor", fill = "none", width="16", height="16" }) {
  return <HeartIconWrapper xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></HeartIconWrapper>
}

export const HeartIconWrapper = styled.svg`
  --parent-height: 8px;
  --parent-width: 16px;
  position: absolute;
  fill: rgba(0, 0, 0, 0.25);
  top: calc(16px + var(--parent-height));
  right: calc(16px + var(--parent-width));
`

export default HeartIcon;