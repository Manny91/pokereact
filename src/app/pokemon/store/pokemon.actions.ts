import { PokemonResponse } from "./../services/pokemon-service";

export const PERFORM_GET_POKEMONS = "[Pokemons] Perform Get Pokemons";
export const PERFORM_GET_POKEMONS_SUCCESS =
  "[Pokemons] Perform Get Pokemons Success";
export const PERFORM_GET_POKEMONS_ERROR =
  "[Pokemons] Perform Get Pokemons Error";

type GetPokemonsAction = { type: "[Pokemons] Perform Get Pokemons" };
type GetPokemonsSuccessAction = {
  type: "[Pokemons] Perform Get Pokemons Success";
  payload: PokemonResponse;
};
type GetPokemonsErrorAction = { type: "[Pokemons] Perform Get Pokemons Error" };

export const performGetPokemonsAction = () => ({
  type: PERFORM_GET_POKEMONS
});

export const performGetPokemonsSuccessAction = (payload: PokemonResponse) => ({
  type: PERFORM_GET_POKEMONS_SUCCESS,
  payload
});

export const performGetPokemonsErrorAction = () => ({
  type: PERFORM_GET_POKEMONS_ERROR
});

export type PokemonsActions =
  | GetPokemonsAction
  | GetPokemonsSuccessAction
  | GetPokemonsErrorAction;
