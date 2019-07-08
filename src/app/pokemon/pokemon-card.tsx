import { Pokemon } from "./services/pokemon-service";
import React, { useEffect } from "react";
import styled from "../../styled.components";
import { PokemonSpriteDisplayer } from "./sprite-displayer/pokemon-sprite";

interface PokemonCardProps {
  key: number;
  pokemon: Pokemon;
}
const Card = styled.div`
  border: 1px solid black;
  display: flex;
`;
export const PokemonCard = ({
  pokemon: { id, name, sprites, weight, height }
}: PokemonCardProps) => {
  return (
    <Card>
      {sprites && <PokemonSpriteDisplayer sprites={sprites} />}
      <div>{name}</div>
    </Card>
  );
};
