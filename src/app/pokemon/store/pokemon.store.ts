import { PokemonMove } from "./../services/pokemon.service";
import { PokedexState } from "./../../store/reducers";
import { createSelector } from "reselect";
import { Pokemon, PokemonResponse } from "../services/pokemon.service";
import {
  PERFORM_GET_POKEMONS_SUCCESS,
  PokemonsActions,
  PERFORM_GET_POKEMONS,
  PERFORM_GET_POKEMONS_ERROR,
  PERFORM_GET_POKEMON,
  PERFORM_GET_POKEMON_SUCCESS,
  PERFORM_GET_POKEMON_MOVE_SUCCESS,
  PERFORM_GET_POKEMON_MOVE,
  PERFORM_GET_POKEMON_MOVE_ERROR
} from "./pokemon.actions";

export interface PokemonState {
  loading: boolean;
  error: boolean;
  pokemons: Pokemon[];
  pokemonsLoaded: number;
  previous?: string;
  next?: string;
  pokemonMoves: PokemonMove[];
  loadingMoves: boolean;
}

export const INITIAL_POKEMON_STATE: PokemonState = {
  loading: true,
  error: false,
  pokemons: [],
  pokemonsLoaded: 0,
  pokemonMoves: [],
  loadingMoves: false
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
        loadingMoves: false,
        ...updatePokemon(state, action.payload)
      };
    case PERFORM_GET_POKEMON_MOVE:
      return {
        ...state,
        loadingMoves: true
      };
    case PERFORM_GET_POKEMON_MOVE_ERROR:
      return {
        ...state,
        loadingMoves: false
      };
    case PERFORM_GET_POKEMON_MOVE_SUCCESS:
      return {
        loading: false,
        error: false,
        ...updatePokemonMove(state, action.payload)
      };
    default:
      return state;
  }
};

function updatePokemonMove(
  { pokemonMoves, ...state }: PokemonState,
  move: PokemonMove
) {
  let storedMove = pokemonMoves.find(storedMove => storedMove.id === move.id);
  if (storedMove) {
    storedMove = Object.assign({}, storedMove, move);
  } else {
    pokemonMoves.push(move);
  }
  return { ...state, pokemonMoves, loadingMoves: false };
}

function updatePokemon(
  { pokemonMoves, pokemons }: PokemonState,
  pokemon: Pokemon
): {
  pokemons: Pokemon[];
  pokemonMoves: PokemonMove[];
  pokemonsLoaded: number;
} {
  let storedPokemon = pokemons.find(storedPokemon => {
    return (
      storedPokemon.id === pokemon.id || storedPokemon.name === pokemon.name
    );
  });
  if (storedPokemon) {
    storedPokemon = Object.assign({}, storedPokemon, pokemon);
  } else {
    pokemons.push(pokemon);
  }
  return {
    pokemons: pokemons.sort((a, b) => a.id - b.id),
    pokemonMoves,
    pokemonsLoaded: pokemons.length
  };
}
function addPokemons(
  state: PokemonState,
  { results, next, previous }: PokemonResponse
) {
  let pokemonStore = state.pokemons;
  pokemonStore = mergePokemons(state.pokemons, results);
  return {
    next,
    previous,
    pokemons: pokemonStore,
    pokemonsLoaded: pokemonStore.length,
    ...state
  };
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

export const getPokemonMoves = createSelector(
  pokemonState,
  pokemonState => pokemonState.pokemonMoves
);

export const getPokemonMovesLoaded = createSelector(
  pokemonState,
  pokemonState => pokemonState.pokemonMoves.length
);
export const getLoadingMoves = createSelector(
  pokemonState,
  pokemonState => pokemonState.loadingMoves
);
