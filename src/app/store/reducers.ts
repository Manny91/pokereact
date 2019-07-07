import { PokemonState } from "./../pokemon/store/pokemon.store";
import { combineReducers } from "redux";
import { Pokemon } from "../pokemon/services/pokemon-service";
import { reducer as pokemonReducer } from "../pokemon/store/pokemon.store";

export interface PokedexState {
  pokemonState: PokemonState;
}

export const reducers = combineReducers<PokedexState>({
  pokemonState: pokemonReducer
});
