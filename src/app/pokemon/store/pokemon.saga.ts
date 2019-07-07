import {
  PERFORM_GET_POKEMONS,
  PERFORM_GET_POKEMON,
  performGetPokemonsSuccessAction,
  performGetPokemonSuccessAction,
  GetPokemonAction,
  performGetPokemonAction
} from "./pokemon.actions";
import {
  all,
  takeLatest,
  fork,
  call,
  put,
  takeEvery
} from "redux-saga/effects";
import pokemonService, { Pokemon } from "../services/pokemon-service";

// Register all your watchers
export default function* pokemonSagas() {
  yield all([fork(watchGetPokemons)]);
}

function* watchGetPokemons() {
  yield takeLatest(PERFORM_GET_POKEMONS, requestPokemons);
  yield takeEvery(PERFORM_GET_POKEMON, requestDetailsPokemon);
}

function* requestPokemons() {
  const pokemons = yield call(pokemonService.getPokemons);
  yield put(performGetPokemonsSuccessAction(pokemons));
  yield all(
    pokemons.results.map((pokemon: Pokemon) => {
      const pokemonId = getPokemonIdFromUrl(pokemon);
      return call(getPokemonDetails, pokemonId);
    })
  );
}

function* requestDetailsPokemon(action: GetPokemonAction) {
  const pokemon = yield call(pokemonService.getPokemon, action.payload);
  yield put(performGetPokemonSuccessAction(pokemon));
}

function* getPokemonDetails(pokemonId: string) {
  yield put(performGetPokemonAction(pokemonId));
}

function getPokemonIdFromUrl(pokemon: Pokemon) {
  return pokemon.url.split("pokemon/")[1].replace("/", "");
}
