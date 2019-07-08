import React, { useEffect } from "react";
import { PokemonsProps } from "./pokemon.container";
import { PokemonCard } from "./pokemon-card";

export const PokemonsComponent = ({
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
  if (loading) {
    return <h1>loading...</h1>;
  }
  if (error) {
    return <h1>error...</h1>;
  }
  return (
    <div>
      <h1>pokemons</h1>
      {pokemons.map((pokemon, index) => {
        return <PokemonCard key={index} pokemon={pokemon} />;
      })}
    </div>
  );
};
