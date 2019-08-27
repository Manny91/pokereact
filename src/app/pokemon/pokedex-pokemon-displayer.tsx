import { Pokemon } from "./services/pokemon.service";
import React, { useEffect } from "react";
import styled from "../../styled.components";
import { PokemonSpriteDisplayer } from "./components/sprite-displayer/pokemon-sprite";

interface PokedexPokemonDisplayerProps {
  pokemon?: Pokemon;
  handleNext: () => void;
  handlePrevious: () => void;
  handleTop: () =>void;
  loading: boolean;
}
export const PokedexPokemonDisplayer = ({
  pokemon,
  handlePrevious,
  handleNext,
  loading,
  handleTop
}: PokedexPokemonDisplayerProps) => {
  let sprites = pokemon ? pokemon.sprites : {front_default: ''};
  let name = pokemon ? pokemon.name : '';
  let description = pokemon ? pokemon.description : '';
  return (

        <>
          <PokemonSpriteDisplayer
            loading={loading}
            name={name}
            sprites={sprites}
            handleNext={handleNext}
            handleTop={handleTop}
            handlePrevious={handlePrevious}
          />
          <PokemonDescription description={loading ? 'loading...' :  description} />
        </>
  );
};

const StatScreen = styled.div`
  border: 1px solid;
  margin-top: -55px;
  width: 60%;
  height: 100px;
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
  description: string;
}
const Description = styled.h4`
  margin: 7px;
`;
const PokemonDescription = ( {description} : PokemonDetails) => {
  return (
    <StatScreen>
      <Description>{description}</Description>
    </StatScreen>
  );
};
