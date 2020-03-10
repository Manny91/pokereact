import { PokemonMove } from "./../services/pokemon.service";
import { PokemonResponse, Pokemon } from "../services/pokemon.service";

export const PERFORM_GET_POKEMONS = "[Pokemons] Perform Get Pokemons";
export const PERFORM_GET_POKEMON = "[Pokemons] Perform Get Pokemon";
export const PERFORM_GET_POKEMONS_SUCCESS =
  "[Pokemons] Perform Get Pokemons Success";
export const PERFORM_GET_POKEMON_SUCCESS =
  "[Pokemons] Perform Get Pokemon Success";
export const PERFORM_GET_POKEMONS_ERROR =
  "[Pokemons] Perform Get Pokemons Error";

export const PERFORM_GET_POKEMON_MOVE = "[Pokemons] Perform Get Pokemon Move";
export const PERFORM_GET_POKEMON_MOVE_SUCCESS =
  "[Pokemons] Perform Get Pokemon Move Success";
export const PERFORM_GET_POKEMON_MOVE_ERROR =
  "[Pokemons] Perform Get Pokemon Move Error";

type GetPokemonsAction = { type: "[Pokemons] Perform Get Pokemons" };

export type GetPokemonAction = {
  type: "[Pokemons] Perform Get Pokemon";
  payload: number;
};
export type GetPokemonsSuccessAction = {
  type: "[Pokemons] Perform Get Pokemons Success";
  payload: PokemonResponse;
};

type GetPokemonSuccessAction = {
  type: "[Pokemons] Perform Get Pokemon Success";
  payload: Pokemon;
};
type GetPokemonsErrorAction = { type: "[Pokemons] Perform Get Pokemons Error" };

export interface GetPokemonMovePayload {
  moveId: number;
  pokemonId: number;
}

export type GetPokemonMoveAction = {
  type: "[Pokemons] Perform Get Pokemon Move";
  payload: number;
};

type GetPokemonMoveSuccessAction = {
  type: "[Pokemons] Perform Get Pokemon Move Success";
  payload: PokemonMove;
};

type GetPokemonMoveErrorAction = {
  type: "[Pokemons] Perform Get Pokemon Move Error";
};
export const performGetPokemonsAction = () => ({
  type: PERFORM_GET_POKEMONS
});

export const performGetPokemonAction = (payload: number) => ({
  type: PERFORM_GET_POKEMON,
  payload
});

export const performGetPokemonsSuccessAction = (payload: PokemonResponse) => ({
  type: PERFORM_GET_POKEMONS_SUCCESS,
  payload
});

export const performGetPokemonSuccessAction = (payload: Pokemon) => ({
  type: PERFORM_GET_POKEMON_SUCCESS,
  payload
});

export const performGetPokemonsErrorAction = () => ({
  type: PERFORM_GET_POKEMONS_ERROR
});

export const performGetPokemonMoveAction = (payload: number) => ({
  type: PERFORM_GET_POKEMON_MOVE,
  payload
});

export const performGetPokemonMoveSuccessAction = (payload: PokemonMove) => ({
  type: PERFORM_GET_POKEMON_MOVE_SUCCESS,
  payload
});

export const performGetPokemonMoveErrorAction = () => ({
  type: PERFORM_GET_POKEMON_MOVE_ERROR
});
export type PokemonsActions =
  | GetPokemonsAction
  | GetPokemonAction
  | GetPokemonSuccessAction
  | GetPokemonsSuccessAction
  | GetPokemonsErrorAction
  | GetPokemonMoveAction
  | GetPokemonMoveSuccessAction
  | GetPokemonMoveErrorAction;
