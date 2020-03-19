import { Pokemon } from "./services/pokemon.service";
import React from "react";
import styled from "../../styled.components";
import { PokemonSpriteDisplayer } from "./components/sprite-displayer/pokemon-sprite";
import { Loading, LoadingWrapper } from "./components/loading/loading";

interface PokedexPokemonDisplayerProps {
  pokemon?: Pokemon;
  handleNext: () => void;
  handlePrevious: () => void;
  handleTop: () => void;
  loading: boolean;
}
export const PokedexPokemonDisplayer = ({
  pokemon,
  handlePrevious,
  handleNext,
  loading,
  handleTop
}: PokedexPokemonDisplayerProps) => {
  let sprites = pokemon ? pokemon.sprites : { front_default: "" };
  let name = pokemon ? pokemon.name : "";
  let description = pokemon ? pokemon.description : "";
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
      <PokemonDescription description={description} loading={loading} />
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
  ${LoadingWrapper} {
    margin: 7px;
  }
`;
interface PokemonDetails {
  description: string;
  loading: boolean;
}
const Description = styled.h4`
  margin: 7px;
`;
const PokemonDescription = ({ description, loading }: PokemonDetails) => {
  return (
    <StatScreen>
      {!loading && <Description>{description}</Description>}
      {loading && <Loading />}
    </StatScreen>
  );
};
