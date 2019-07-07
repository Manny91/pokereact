import { PokedexState } from "./../../store/reducers";
import { createSelector } from "reselect";
import { Pokemon, PokemonResponse } from "./../services/pokemon-service";
import {
  PERFORM_GET_POKEMONS_SUCCESS,
  PokemonsActions,
  PERFORM_GET_POKEMONS,
  PERFORM_GET_POKEMONS_ERROR,
  PERFORM_GET_POKEMON,
  PERFORM_GET_POKEMON_SUCCESS
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
    case PERFORM_GET_POKEMONS:
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
    case PERFORM_GET_POKEMON:
      return {
        ...state,
        loading: false,
        error: false
      };
    case PERFORM_GET_POKEMON_SUCCESS:
      return {
        loading: false,
        error: false,
        pokemons: updatePokemon(state, action.payload)
      };
    default:
      return state;
  }
};

function updatePokemon({ pokemons }: PokemonState, pokemon: Pokemon) {
  return pokemons.map(pokemonStore => {
    if (pokemonStore.name === pokemon.name) {
      return { ...pokemon };
    }
    return pokemonStore;
  });
}
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
    pokemonStore = pokemonStore.concat(incomingPokemons);
  }
  return pokemonStore;
}

const pokemonState = (state: PokedexState): PokemonState => state.pokemonState;

export const getPokemons = createSelector(
  pokemonState,
  pokemonState => pokemonState.pokemons
);
export const getPokemonsError = createSelector(
  pokemonState,
  pokemonState => pokemonState.error
);

export const getPokemonsNext = createSelector(
  pokemonState,
  pokemonState => pokemonState.next
);
export const getPokemonsPrevious = createSelector(
  pokemonState,
  pokemonState => pokemonState.previous
);

export const getPokemonsLoading = createSelector(
  pokemonState,
  pokemonState => pokemonState.loading
);
