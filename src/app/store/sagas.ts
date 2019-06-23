import { all, fork } from "redux-saga/effects";
import pokemonSagas from "../pokemon/store/pokemon.saga";

function* sagas() {
  yield all([fork(pokemonSagas)]);
}

export default sagas;
