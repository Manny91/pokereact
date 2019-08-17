import { Pokemon } from "./services/pokemon-service";
import React, { useEffect } from "react";
import styled from "../../styled.components";
import { PokemonSpriteDisplayer } from "./components/sprite-displayer/pokemon-sprite";

interface PokedexPokemonDisplayerProps {
  key: number;
  pokemon: Pokemon;
}
export const PokedexPokemonDisplayer = ({
  pokemon
}: PokedexPokemonDisplayerProps) => {
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
  margin-top: -35px;
  width: 60%;
  max-height: 100px;
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
const Description = styled.h4`
  margin: 7px;
`;
const PokemonDescription = ({ pokemon: { description } }: PokemonDetails) => {
  return (
    <StatScreen>
      <Description>{description}</Description>
    </StatScreen>
  );
};
