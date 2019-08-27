import { PokedexState } from "./../../store/reducers";
import { createSelector } from "reselect";
import { Pokemon, PokemonResponse } from "../services/pokemon.service";
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
  pokemonsLoaded: number;
  previous?: string;
  next?: string;
}

export const INITIAL_POKEMON_STATE: PokemonState = {
  loading: true,
  error: false,
  pokemons: [],
  pokemonsLoaded: 0
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
        loading: true,
        error: false
      };
    case PERFORM_GET_POKEMON_SUCCESS:
      return {
        loading: false,
        error: false,
        ...updatePokemon(state, action.payload)
      };
    default:
      return state;
  }
};

function updatePokemon({ pokemons }: PokemonState, pokemon: Pokemon): {pokemons: Pokemon[], pokemonsLoaded: number} {
    let storedPokemon = pokemons.find((storedPokemon) => {
        return storedPokemon.id === pokemon.id || storedPokemon.name === pokemon.name
    });
    if (storedPokemon) {
        storedPokemon = Object.assign({},storedPokemon, pokemon);
    } else {
        pokemons.push(pokemon);
    }
    return {pokemons: pokemons.sort((a,b) => a.id - b.id) , pokemonsLoaded: pokemons.length};
}
function addPokemons(
  state: PokemonState,
  { results, next, previous }: PokemonResponse
) {
  let pokemonStore = state.pokemons;
  pokemonStore = mergePokemons(state.pokemons, results);
  return { next, previous, pokemons: pokemonStore, pokemonsLoaded: pokemonStore.length };
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

export const getPokemonsLoaded = createSelector(
    pokemonState,
    pokemonState => pokemonState.pokemonsLoaded
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
