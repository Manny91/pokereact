import { PokemonState } from "./../pokemon/store/pokemon.store";
import { combineReducers } from "redux";
import { Pokemon } from "../pokemon/services/pokemon-service";
import { reducer as pokemonReducer } from "../pokemon/store/pokemon.store";

interface PokedexState {
  pokemons: PokemonState;
}

export const reducers = combineReducers<PokedexState>({
  pokemons: pokemonReducer
});
