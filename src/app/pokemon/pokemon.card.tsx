import { Pokemon } from "./services/pokemon-service";
import React, { useEffect } from "react";
import styled from "../../styled.components";

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
      {sprites && <img src={sprites.front_default} />}
      <div>{name}</div>
    </Card>
  );
};
