import {
  PokemonSpeciesDetail,
  FlavourText
} from "./../services/pokemon-service";
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
  pokemon.description = getFlavorEngText(specieDetail);
  yield put(performGetPokemonSuccessAction(pokemon));
}

function* getPokemonDetails(pokemonId: string) {
  yield put(performGetPokemonAction(pokemonId));
}

function getPokemonIdFromUrl(pokemon: Pokemon) {
  return pokemon.url.split("pokemon/")[1].replace("/", "");
}

function getFlavorEngText(specieDetail: PokemonSpeciesDetail): string {
  const flavorEntryEng = specieDetail.flavor_text_entries.find(flavour => {
    return flavour.language.name === "en";
  });
  return flavorEntryEng ? flavorEntryEng.flavor_text : "";
}
