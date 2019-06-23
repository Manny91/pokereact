import { Pokemon, PokemonResponse } from "./../services/pokemon-service";
import {
  PERFORM_GET_POKEMONS_SUCCESS,
  PokemonsActions,
  PERFORM_GET_POKEMONS_ERROR
} from "./pokemon.actions";

export interface PokemonState {
  loading: boolean;
  error: boolean;
  pokemons: Pokemon[];
  next?: string;
  previous?: string;
}

export const INITIAL_POKEMON_STATE: PokemonState = {
  loading: true,
  error: false,
  pokemons: [],
  next: undefined,
  previous: undefined
};

export const reducer = (
  state = INITIAL_POKEMON_STATE,
  action: PokemonsActions
): PokemonState => {
  switch (action.type) {
    case PERFORM_GET_POKEMONS_ERROR:
      return { ...state, error: true, loading: false };
    case PERFORM_GET_POKEMONS_SUCCESS:
      return {
        ...state,
        loading: true,
        error: false
      };
    case PERFORM_GET_POKEMONS_SUCCESS:
      return {
        loading: false,
        error: false,
        ...addPokemons(state, action.payload)
      };
    default:
      return state;
  }
};

function addPokemons(
  state: PokemonState,
  { results, next, previous }: PokemonResponse
) {
  let pokemonStore = state.pokemons;
  pokemonStore = mergePokemons(state.pokemons, results);
  return { next, previous, pokemons: pokemonStore };
}

function mergePokemons(pokemonStore: Pokemon[], incomingPokemons: Pokemon[]) {
  if (incomingPokemons.every(pokemon => !pokemonStore.includes(pokemon))) {
    pokemonStore.concat(incomingPokemons);
  }
  return pokemonStore;
}
