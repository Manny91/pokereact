import httpClient from "../../../services/http-client";

export interface PokemonSprite {
  back_default?: string;
  front_default?: string;
  back_shiny?: string;
  front_shiny?: string;
  back_female?: string;
  front_female?: string;
}
interface Language {
  name: string;
}
export interface FlavourText {
  flavor_text: string;
  language: Language;
}
export interface PokemonSpeciesDetail {
  base_happiness: number;
  capture_rate: number;
  flavor_text_entries: FlavourText[];
  evolution_chain: ChainLink;
  evolutions: Pokemon[];
  id: number;
  name: string;
  url: string;
}

export interface ChainLink {
  id: number;
  chain: EvolutionChain[];
  url: string;
  species: { name: string };
  evolves_to: ChainLink[];
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: { name: string };
}
interface PokemonTypes {
  slot: number;
  type: { name: string };
}
export interface PokemonMove {
  name: string;
  url: string;
  id: number;
  accuracy: number;
  power: number;
  pp: number;
  move: { name: string; url: string };
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprite;
  weight: number;
  height: number;
  url: string;
  description: string;
  species: PokemonSpeciesDetail;
  stats: PokemonStat[];
  types: PokemonTypes[];
  moves: PokemonMove[];
}

export interface PokemonResponse {
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface PokemonInfoDisplayer {
  pokemon: Pokemon;
}

async function getPokemonByIdOrName(
  pokemonIdOrName: number | string
): Promise<Pokemon> {
  const res = await httpClient.get(`pokemon/${pokemonIdOrName}/`);
  return res.json();
}

async function getPokemons(): Promise<PokemonResponse> {
  const res = await httpClient.get(`pokemon`);
  return res.json();
}
async function getSpecie(pokemonNo: number): Promise<PokemonSpeciesDetail> {
  const res = await httpClient.get(`pokemon-species/${pokemonNo}`);
  return res.json();
}
async function getEvolutionChain(
  evolutionChainId: number
): Promise<EvolutionChain> {
  const res = await httpClient.get(`evolution-chain/${evolutionChainId}`);
  return res.json();
}
async function getMove(moveId: number): Promise<PokemonMove> {
  const res = await httpClient.get(`move/${moveId}`);
  return res.json();
}
export default {
  getPokemons,
  getPokemonByIdOrName,
  getSpecie,
  getEvolutionChain,
  getMove
};
