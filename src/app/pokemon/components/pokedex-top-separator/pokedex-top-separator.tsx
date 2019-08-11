import React from "react";
import styled from "../../../../styled.components";

type Orientation = "LEFT" | "RIGHT";
interface State {
  orientation: Orientation;
  handleClick?: () => void;
}
function PokedexTopSeparator({ orientation, handleClick }: State) {
  return (
    <SeparatorWrapper onClick={handleClick}>
      <TopSeparator orientation={orientation} />
      <BottomSeparator className={orientation === "RIGHT" ? "right" : "left"} />
    </SeparatorWrapper>
  );
}

function TopSeparator({ orientation }: State) {
  return (
    <Container>
      <Left orientation={orientation} />
      <Right className={orientation === "RIGHT" ? "right" : "left"} />
    </Container>
  );
}
function Left({ orientation }: State) {
  return (
    <LeftWrapper>
      <LeftInner className={orientation === "RIGHT" ? "right" : "left"} />
    </LeftWrapper>
  );
}
const SeparatorWrapper = styled.div`
  height: 80px;
  overflow: hidden;
  cursor: pointer;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const LeftWrapper = styled.div`
  width: 70%;
  height: 100%;
`;
const LeftInner = styled.div`
  height: 100%;
  width: 272px;
  border-bottom: 10px double black;
  position: relative;
  bottom: 10px;
  &:after {
    content: "";
    position: absolute;
    bottom: -7px;
    width: 12px;
    height: 4px;
    right: 0px;
    background: #e61515;
    z-index: 1;
  }
  &.right {
    background-color: #e61515;
    height: 0px;
    margin-top: 80px;
    border-top: 10px double;
    width: 262px;
    border-left: 10px double;
    z-index: 1;
    &:after {
      bottom: auto;
      top: -7px;
    }
  }
`;

const Right = styled.div`
  width: 225px;
  height: 100%;
  display: flex;
  border-top: 10px double;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    background-color: #e61515;
    height: 4px;
    width: 26px;
    top: -7px;
    left: 0px;
    z-index: 1;
  }
  &.right {
    border-right: 10px double;
    width: 213px;
    background-color: #e61515;
    z-index: 1;
    &:after {
      bottom: -7px;
      top: auto;
      left: 3px;
    }
  }
`;

const BottomSeparator = styled.div`
  height: 110px;
  width: 100%;
  border-top: 10px double black;
  transform: rotate(320deg);
  position: relative;
  &:after {
    content: "";
    position: absolute;
    background-color: #e61515;
    height: 4px;
    width: 26px;
    top: -7px;
    right: 12%;
  }
  &.right {
    background-color: #e61515;
  }
`;
export default PokedexTopSeparator;
