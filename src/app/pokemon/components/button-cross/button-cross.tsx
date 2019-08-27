import React from "react";
import styled from "../../../../styled.components";

type Direction = "TOP" | "BOTTOM" | "LEFT" | "RIGHT";

function crossControl(
  direction: Direction,
  radius: string = "7px",
  colour: string = "#ffffff96"
) {
  const contentAfterStyle = `
        content: "";
        position: absolute;
        height: 150%;
        width: 100%;
        border-radius: 50%;
    `;
  const shadowTopStyle = `
        background: linear-gradient(0deg, transparent 0, transparent 30%, transparent 45%, transparent 70%,${colour} 80%, transparent 83%);
    `;
  const directionTop = `
        border-top-left-radius: ${radius};
        border-top-right-radius: ${radius};
        border: 2px solid;
        border-bottom: none;
        &:after {
            ${contentAfterStyle}
            ${shadowTopStyle}
        }`;
  const directionBottom = `
        border-bottom-left-radius: ${radius};
        border-bottom-right-radius: ${radius};
        border: 2px solid;
        border-top: none;
        &:after {
            ${contentAfterStyle}
            background: linear-gradient(-180deg, transparent 0, transparent 30%, transparent 45%, transparent 70%,${colour} 80%, transparent 83%);
        }`;
  const directionLeft = `
        border-bottom-left-radius: ${radius};
        border-top-left-radius: ${radius};
        border: 2px solid;
        border-right: none;
        &:after {
            ${contentAfterStyle}
            ${shadowTopStyle}
        }`;
  const directionRight = `
        border-top-right-radius: ${radius};
        border-bottom-right-radius: ${radius};
        border: 2px solid;
        border-left: none;
        &:after {
            ${contentAfterStyle}
            ${shadowTopStyle}
        }`;

  let crossControlStyle = `
        display: flex;
        justify-content: center;
        align-items: center;
        position:relative;
    `;
  switch (direction) {
    case "TOP":
      return crossControlStyle + directionTop;
    case "BOTTOM":
      return crossControlStyle + directionBottom;
    case "LEFT":
      return crossControlStyle + directionLeft;
    case "RIGHT":
      return crossControlStyle + directionRight;
  }
}

function triangle(
  direction: Direction,
  sizeH: string,
  sizeV: string,
  colour: string
) {
  let triangleStyle = `
  content: '';
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        -moz-transform: scale(.9999);
    `;
  const directionTop = `
        border-width: 0 ${sizeV} ${sizeH} ${sizeV};
        border-color: transparent transparent ${colour} transparent;
    `;
  const directionBottom = `
        border-width: ${sizeH} ${sizeV} 0 ${sizeV};
        border-color: ${colour} transparent transparent transparent;
    `;
  const directionLeft = `
        border-width: ${sizeV} ${sizeH} ${sizeV} 0;
        border-color: transparent ${colour} transparent transparent;
    `;
  const directionRight = `
        border-width: ${sizeV} 0 ${sizeV} ${sizeH};
        border-color: transparent transparent transparent ${colour};
    `;
  switch (direction) {
    case "TOP":
      return triangleStyle + directionTop;
    case "BOTTOM":
      return triangleStyle + directionBottom;
    case "LEFT":
      return triangleStyle + directionLeft;
    case "RIGHT":
      return triangleStyle + directionRight;
  }
}

const ButtonCrossWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 25px;
`;
const HorizontalWrapper = styled.div`
  display: flex;
`;
const BoxStyled = styled.div`
  background-color: #292929;
  width: 33.33px;
  height: 33.33px;
`;
const BoxCentered = styled(BoxStyled)`
  margin: 0 auto;
  box-shadow: 2px 0px 0px 0px #00000096;
`;
const MiddleBox = styled(BoxStyled)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 38px;
  &:after {
    content: "";
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: black;
  }
`;
const Triangle = styled.div`
background-color
`;

function Box(direction: Direction, clickHandler?: () => void, loading?: boolean) {
  const emptyFunction = () => {};
  const BoxVertical = styled(BoxCentered)`
    cursor: pointer;
    ${crossControl(direction)}
    ${Triangle} {
      ${triangle(direction, "22px", "14px", "black")}
    }
  `;
  const BoxDirectionStyled = styled(BoxStyled)`
    cursor: pointer;
    .disabled {
        cursor: none;
    }
    ${crossControl(direction)}
    ${Triangle} {
      ${triangle(direction, "22px", "14px", "black")}
    }
  `;
  if (direction === "TOP" || direction === "BOTTOM") {
    return (
      <BoxVertical onClick={loading ? emptyFunction : clickHandler} className={loading ? 'disabled': ''}>
        <Triangle />
      </BoxVertical>
    );
  }
  return (
    <BoxDirectionStyled onClick={loading ? emptyFunction : clickHandler} className={loading ? 'disabled': ''}>
      <Triangle />
    </BoxDirectionStyled>
  );
}

interface State  {
    handleNext: () => void;
    handlePrevious: () => void;
    handleTop: () => void
    loading: boolean;
}
export function ButtonCross({handleNext, handlePrevious, handleTop, loading}: State) {
  return (
    <ButtonCrossWrapper>
      {Box("TOP", handleTop, loading)}
      <HorizontalWrapper>
        {Box("LEFT", handlePrevious, loading)}
        <MiddleBox />
        {Box("RIGHT", handleNext, loading)}
      </HorizontalWrapper>
      {Box("BOTTOM")}
    </ButtonCrossWrapper>
  );
}
