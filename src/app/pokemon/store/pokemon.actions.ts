import { PokemonResponse, Pokemon } from "./../services/pokemon-service";

export const PERFORM_GET_POKEMONS = "[Pokemons] Perform Get Pokemons";
export const PERFORM_GET_POKEMON = "[Pokemons] Perform Get Pokemon";
export const PERFORM_GET_POKEMONS_SUCCESS =
  "[Pokemons] Perform Get Pokemons Success";
export const PERFORM_GET_POKEMON_SUCCESS =
  "[Pokemons] Perform Get Pokemon Success";
export const PERFORM_GET_POKEMONS_ERROR =
  "[Pokemons] Perform Get Pokemons Error";

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

export const performGetPokemonsAction = () => ({
  type: PERFORM_GET_POKEMONS
});

export const performGetPokemonAction = (payload: string) => ({
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

export type PokemonsActions =
  | GetPokemonsAction
  | GetPokemonAction
  | GetPokemonSuccessAction
  | GetPokemonsSuccessAction
  | GetPokemonsErrorAction;
