import httpClient from "../../../services/http-client";

interface PokemonSprite {
  back_default?: string;
  front_default?: string;
  back_shiny?: string;
  front_shiny?: string;
  back_female?: string;
  front_female?: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprite;
  weight: number;
  height: number;
}

export interface PokemonResponse {
  next: string;
  previous: string;
  results: Pokemon[];
}

async function getPokemon(pokemonNo: number): Promise<Pokemon> {
  const res = await httpClient.get(`/pokemon/${pokemonNo}`);
  return res.json();
}

async function getPokemons(): Promise<PokemonResponse> {
  const res = await httpClient.get(`/pokemon`);
  return res.json();
}

export default {
  getPokemons,
  getPokemon
};
