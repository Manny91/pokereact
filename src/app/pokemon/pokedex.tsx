import React, { useEffect, useState, ReactNode } from "react";
import { PokemonsProps } from "./pokemons.container";
import { PokedexPokemonDisplayer } from "./pokedex-pokemon-displayer";
import styled from "../../styled.components";
import PokedexLeft from "./components/pokedex-left/pokedex-left";
import PokedexRight from "./components/pokedex-right/pokedex-right";
import { Pokemon } from "./services/pokemon-service";

export interface PokedexPage {
  pageOpen: boolean;
}
export const PokedexComponent = ({
  pokemons,
  loading,
  error,
  previous,
  getPokemons,
  getPokemon
}: PokemonsProps) => {
  useEffect(() => {
    getPokemons();
  }, []);
  const [selectedPokemon, selectPokemon] = useState(pokemons[0]);

  const [opened, openPokedex] = useState(false);

  if (loading) {
    return <h1>loading...</h1>;
  }
  if (error) {
    return <h1>error...</h1>;
  }
  return (
    <PokedexContainer>
      <PokedexLeft handleClick={() => openPokedex(!opened)}>
        {opened && <PokemonDisp pokemon={selectedPokemon} />}
      </PokedexLeft>
      <PageDivider pageOpen={opened} />
      <PokedexRight pageOpen={opened} />
    </PokedexContainer>
  );
};

const PokedexContainer = styled.div`
  position: relative;
  width: 1140px;
  border-radius: 15px;
  display: flex;
  padding-bottom: 10px;
  margin: 15px auto;
`;

const PageGap = styled.div`
  flex: 1;
  width: 95%;
`;
const PageHinge = styled.div`
  flex: 10;
  width: 100%;
`;
const PageDividerWrapper = styled.div`
  margin-top: 112px;
  border-top: 3px solid;
  border-left: 3px solid;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  width: 10px;
  margin-left: -30px;
  z-index: 1;
  &:after {
    content: "";
    background: #e61515;
    height: 7px;
    width: 17px;
  }
  &.open > * {
    border-radius: 4px;
    border: solid #2d0d0d 2px;
  }
  &.open {
    &:after {
      content: none;
    }
    align-items: center;
    border: inset #460f0f 5px;
    border-radius: 4px;
    background: #460f0f;
    ${PageHinge} {
      background: linear-gradient(
        90deg,
        #891313 0,
        #b31818 30%,
        #e61515 45%,
        #fd5555 65%,
        #e61515 95%
      );
      border-right-color: #fd5555;
      border-top-color: #fd5555;
      border-left-color: #5f1010;
    }
    .gap:first-child {
      border-radius: 0 0 5px 5px;
      border-top: none;
    }
    .gap:last-child {
      border-radius: 5px 5px 0 0;
    }
    ${PageGap} {
      background: linear-gradient(
        90deg,
        #460f0f 0,
        #891313 30%,
        #b31818 45%,
        #fd5555 65%,
        #b31818 95%
      );
      border-top-color: #891313;
      border-right-color: #b31818;
    }
  }
`;
function PageDivider({ pageOpen }: PokedexPage) {
  return (
    <PageDividerWrapper className={pageOpen ? "open" : ""}>
      <PageGap />
      <PageHinge />
      <PageGap />
      <PageHinge />
      <PageGap />
      <PageHinge />
      <PageGap />
    </PageDividerWrapper>
  );
}
const PokemonPageDisplayer = styled.div`
  padding: 30px;
`;
type pokemonDispState = {
  pokemon: Pokemon;
};
function PokemonDisp({ pokemon }: pokemonDispState) {
  //   const firstPokemon = pokemons[0];
  return (
    <PokemonPageDisplayer>
      <PokedexPokemonDisplayer key={pokemon.id} pokemon={pokemon} />
    </PokemonPageDisplayer>
  );
}
