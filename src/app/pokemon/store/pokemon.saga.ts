import { PokemonMove } from "./../services/pokemon.service";
import { PokemonSpeciesDetail } from "../services/pokemon.service";
import {
  PERFORM_GET_POKEMON,
  performGetPokemonSuccessAction,
  GetPokemonAction,
  performGetPokemonAction,
  PERFORM_GET_POKEMON_MOVE,
  GetPokemonMoveAction,
  performGetPokemonMoveSuccessAction
} from "./pokemon.actions";
import { all, takeLatest, fork, call, put } from "redux-saga/effects";
import pokemonService, { Pokemon } from "../services/pokemon.service";

// Register all your watchers
export default function* pokemonSagas() {
  yield all([fork(watchGetPokemons)]);
}

function* watchGetPokemons() {
  //   yield takeLatest(PERFORM_GET_POKEMONS, requestPokemons);
  yield takeLatest(PERFORM_GET_POKEMON, requestDetailsPokemon);
  yield takeLatest(PERFORM_GET_POKEMON_MOVE, requestPokemonMove);
}

// function* requestPokemons() {
//   const pokemons = yield call(pokemonService.getPokemons);
//   yield put(performGetPokemonsSuccessAction(pokemons));
//   yield all(
//     pokemons.results.map((pokemon: Pokemon) => {
//       const pokemonId = getPokemonIdFromUrl(pokemon);
//       return call(getPokemonDetails, pokemonId);
//     })
//   );
// }

function* requestDetailsPokemon(action: GetPokemonAction) {
  const pokemon: Pokemon = yield call(
    pokemonService.getPokemon,
    action.payload
  );
  const specieDetail: PokemonSpeciesDetail = yield call(
    pokemonService.getSpecie,
    action.payload
  );
  const evolutionChainUrlArray = specieDetail.evolution_chain.url.split("/");
  const evolutionChainId = +evolutionChainUrlArray[
    evolutionChainUrlArray.length - 2
  ];
  const evolutionChain = yield call(
    pokemonService.getEvolutionChain,
    evolutionChainId
  );
  specieDetail.evolution_chain = evolutionChain;
  pokemon.species = specieDetail;
  pokemon.moves = pokemon.moves.map(flatMoves);
  pokemon.description = getFlavorEngText(specieDetail);
  yield put(performGetPokemonSuccessAction(pokemon));
}

function* requestPokemonMove(action: GetPokemonMoveAction) {
  const move = yield call(pokemonService.getMove, action.payload);
  yield put(performGetPokemonMoveSuccessAction(move));
}
// function* getPokemonDetails(pokemonId: number) {
//   yield put(performGetPokemonAction(pokemonId));
// }

// function getPokemonIdFromUrl(pokemon: Pokemon) {
//   return pokemon.url.split("pokemon/")[1].replace("/", "");
// }

function getPokemonMoveIdFromUrl(url: string): number {
  return +url.split("move/")[1].replace("/", "");
}

function getFlavorEngText(specieDetail: PokemonSpeciesDetail): string {
  const flavorEntryEng = specieDetail.flavor_text_entries.find(flavour => {
    return flavour.language.name === "en";
  });
  return flavorEntryEng ? flavorEntryEng.flavor_text : "";
}

function flatMoves(pokemonMove: PokemonMove): PokemonMove {
  const id = getPokemonMoveIdFromUrl(pokemonMove.move.url);
  return Object.assign({ id: id }, pokemonMove, pokemonMove.move);
}
