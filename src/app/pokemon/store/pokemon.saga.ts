import {
  PERFORM_GET_POKEMONS,
  performGetPokemonsSuccessAction
} from "./pokemon.actions";
import { all, takeLatest, fork, call, put } from "redux-saga/effects";
import pokemonService from "../services/pokemon-service";

// Register all your watchers
export default function* pokemonSagas() {
  yield all([fork(watchGetPokemons)]);
}

function* watchGetPokemons() {
  yield takeLatest(PERFORM_GET_POKEMONS, requestNewGeneratedNumber);
}

function* requestNewGeneratedNumber() {
  const pokemons = yield call(pokemonService.getPokemons);
  yield put(performGetPokemonsSuccessAction(pokemons));
}
