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
export const PokemonDisplayer = ({ pokemon }: PokemonDisplayerProps) => {
  return (
    <>
      {pokemon.sprites && (
        <>
          <PokemonSpriteDisplayer
            name={pokemon.name}
            sprites={pokemon.sprites}
          />
          <PokemonDescription pokemon={pokemon} />
        </>
      )}
    </>
  );
};

const StatScreen = styled.div`
  border: 1px solid;
  height: 100px;
  width: 100px;
  font-family: "VT323";
  background: linear-gradient(
    14deg,
    rgb(165, 205, 83) 60%,
    rgb(193, 217, 144) 65%
  );
  padding: 5px;
  border-radius: 3px;
  font-family: "VT323";
  border: inset #879a65 3px;
`;
interface PokemonDetails {
  pokemon: Pokemon;
}
const PokemonDescription = ({ pokemon: { name } }: PokemonDetails) => {
  return (
    <StatScreen>
      <h1>{name}</h1>
    </StatScreen>
  );
};
