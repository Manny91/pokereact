import styled from "../../../../styled.components";
import React, { ReactNode } from "react";
import PokedexCircles from "./pokedex-circles/pokedex-circles";
import PokedexTopSeparator from "../pokedex-top-separator/pokedex-top-separator";

type State = {
  children: ReactNode;
  handleClick: () => void;
};
function PokedexLeft({ children, handleClick }: State) {
  return (
    <PokedexLeftContainer>
      <PokedexCircles handleClick={handleClick} />
      <PokedexTopSeparator orientation="LEFT" handleClick={handleClick} />
      <Panel>{children}</Panel>
    </PokedexLeftContainer>
  );
}

const PokedexLeftContainer = styled.div`
  width: 560px;
  border-radius: 15px;
  background-color: #e61515;
  border: 10px double;
`;

const Panel = styled.div`
  height: 500px;
  width: 540px;
  background-color: #e61515;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
export default PokedexLeft;
