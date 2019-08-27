import React, { useEffect } from "react";
import { PokemonsProps } from "./pokemons.container";
import { PokedexPokemonDisplayer } from "./pokedex-pokemon-displayer";

export const PokemonsComponent = ({
  pokemons,
  loading,
  error,
  getPokemons,
}: PokemonsProps) => {
  useEffect(() => {
    getPokemons();
  }, []);
  if (error) {
    return <h1>error...</h1>;
  }
  return (
    <div>
      <h1>pokemons</h1>

      {pokemons.map((pokemon, index) => {
        // return <PokedexPokemonDisplayer loading={loading} handleNext={() => {}} handlePrevious={() => {}} key={index} pokemon={pokemon} />;
        return <h1 key={index}>{pokemon.name}</h1>
      })}
    </div>
  );
};
