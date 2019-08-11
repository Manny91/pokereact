import { Pokemon } from "./services/pokemon-service";
import React, { useEffect } from "react";
import styled from "../../styled.components";
import { PokemonSpriteDisplayer } from "./components/sprite-displayer/pokemon-sprite";

interface PokemonDisplayerProps {
  key: number;
  pokemon: Pokemon;
}
const Card = styled.div`
  border: 1px solid black;
  display: flex;
  background-color: ${props => props.theme.colors.lightGreen};
`;
export const PokemonDisplayer = ({
  pokemon: { id, name, sprites, weight, height }
}: PokemonDisplayerProps) => {
  return <>{sprites && <PokemonSpriteDisplayer sprites={sprites} />}</>;
};
