import React from "react";
import styled from "../../../../styled.components";
import { Pokemon } from "../../services/pokemon.service";

type Props = {
  evolutionChain: Pokemon[];
};

export function EvolutionChainDisplayer({ evolutionChain }: Props) {
  return (
    <>
      {evolutionChain.map((pokemon, key) => {
        return (
          <PokemonDisplayer key={key} pokemon={pokemon}></PokemonDisplayer>
        );
      })}
    </>
  );
}

type PokemonDisplayerProp = {
  pokemon: Pokemon;
};

function PokemonDisplayer({ pokemon }: PokemonDisplayerProp) {
  return (
    <PokemonScreen>
      <div>{pokemon.name}</div>
      <img src={pokemon.sprites.front_default}></img>
    </PokemonScreen>
  );
}

const PokemonScreen = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  font-family: "VT323";
  flex-grow: 1;
  background: linear-gradient(
    14deg,
    rgb(165, 205, 83) 60%,
    rgb(193, 217, 144) 65%
  );
  border: inset #9aa28b 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
  img {
    width: 100px;
    image-rendering: pixelated;
  }
`;
