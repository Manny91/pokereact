import React from "react";
import styled from "styled-components";

type State = {
  handleClick?: () => void;
};
function PokedexCircles({ handleClick }: State) {
  return (
    <PokedexCirclesContainer onClick={handleClick}>
      <PokedexCircle />
      <PokedexCircleSmallRed />
      <PokedexCircleSmallYellow />
      <PokedexCircleSmallGreen />
    </PokedexCirclesContainer>
  );
}
function PokedexCircle() {
  return (
    <PokedexCircleStyled>
      <PokedexCircleInsideStyled />
    </PokedexCircleStyled>
  );
}
function PokedexCircleSmallRed() {
  return (
    <PokedexCircleSmallWrapperStyled>
      <PokedexCircleInsideRedStyled />
    </PokedexCircleSmallWrapperStyled>
  );
}
function PokedexCircleSmallYellow() {
  return (
    <PokedexCircleSmallWrapperStyled>
      <PokedexCircleInsideYellowStyled />
    </PokedexCircleSmallWrapperStyled>
  );
}
function PokedexCircleSmallGreen() {
  return (
    <PokedexCircleSmallWrapperStyled>
      <PokedexCircleInsideGreenStyled />
    </PokedexCircleSmallWrapperStyled>
  );
}

const PokedexCirclesContainer = styled.div`
  display: flex;
  height: 95px;
  cursor: pointer;
`;
const PokedexCircleStyled = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50%;
  border: double black 10px;
  position: relative;
  margin: 1em;
  &:after {
    content: "";
    filter: blur(1px);
    position: absolute;
    top: 25%;
    width: 12%;
    height: 12%;
    background-color: white;
    left: 25%;
    border-radius: 50%;
  }
`;
const PokedexCircleSmallWrapperStyled = styled(PokedexCircleStyled)`
  width: 20px;
  height: 20px;
`;
const PokedexCircleInsideStyled = styled.div`
  background-image: linear-gradient(to right, #6f95ff, #3c54a6);
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;
const PokedexCircleInsideRedStyled = styled(PokedexCircleInsideStyled)`
  background-image: linear-gradient(to right, #e61515, #ce0000);
`;
const PokedexCircleInsideYellowStyled = styled(PokedexCircleInsideStyled)`
  background-image: linear-gradient(to right, yellow, #dada03);
`;
const PokedexCircleInsideGreenStyled = styled(PokedexCircleInsideStyled)`
  background-image: linear-gradient(to right, #008000, #016301);
`;

export default PokedexCircles;
