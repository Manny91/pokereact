import styled from "../../../../styled.components";
import React from "react";
import PokedexCircles from "./pokedex-circles/pokedex-circles";
import PokedexTopSeparator from "../pokedex-top-separator/pokedex-top-separator";

function PokedexLeft() {
  return (
    <PokedexLeftContainer>
      <PokedexCircles />
      <PokedexTopSeparator orientation="LEFT" />
      <Panel />
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
  height: 450px;
  width: 540px;
  background-color: #e61515;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
export default PokedexLeft;
