import {
  PokemonMove,
  EvolutionChain,
  ChainLink
} from "./../services/pokemon.service";
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
  yield takeLatest(PERFORM_GET_POKEMON, requestDetailsPokemon);
  yield takeLatest(PERFORM_GET_POKEMON_MOVE, requestPokemonMove);
}

function* requestDetailsPokemon(action: GetPokemonAction) {
  const pokemon: Pokemon = yield call(
    pokemonService.getPokemonByIdOrName,
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

  const evolutionChain = yield getEvolutionChain(evolutionChainId);
  specieDetail.evolutions = evolutionChain;
  pokemon.species = specieDetail;
  pokemon.moves = pokemon.moves.map(flatMoves);
  pokemon.description = getFlavorEngText(specieDetail);
  yield put(performGetPokemonSuccessAction(pokemon));
}

function* requestPokemonMove(action: GetPokemonMoveAction) {
  const move = yield call(pokemonService.getMove, action.payload);
  yield put(performGetPokemonMoveSuccessAction(move));
}

function* getEvolutionChain(evolutionChainId: number) {
  const evolutionChain: EvolutionChain = yield call(
    pokemonService.getEvolutionChain,
    evolutionChainId
  );
  const chainNames = getNamesOfChain(evolutionChain);
  const pokemonEvolutions = yield all(
    chainNames.map(chainName => {
      return getPokemonByName(chainName);
    })
  );
  return pokemonEvolutions;
}

function* getPokemonByName(pokemonName: string) {
  const pokemon: Pokemon = yield call(
    pokemonService.getPokemonByIdOrName,
    pokemonName
  );
  return pokemon;
}

function getNamesOfChain(evolutionChain: EvolutionChain): string[] {
  const chain1 = evolutionChain.chain;
  const chain2 = chain1.evolves_to[0];
  const chain3 = chain2.evolves_to[0];
  const chainNamesString = `${getChainSpeciesName(
    chain1
  )},${getChainSpeciesName(chain2)}${
    chain3 ? "," + getChainSpeciesName(chain3) : ""
  }`;
  return chainNamesString.split(",");
}

function getChainSpeciesName(evolutionChain: ChainLink): string {
  return (
    evolutionChain && evolutionChain.species && evolutionChain.species.name
  );
}

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
