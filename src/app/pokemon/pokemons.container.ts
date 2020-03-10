import {
  PokemonState,
  getPokemons,
  getPokemonsError,
  getPokemonsNext,
  getPokemonsPrevious,
  getPokemonsLoading,
  getPokemonMoves,
  getPokemonMovesLoaded,
  getLoadingMoves
} from "./store/pokemon.store";
import { connect } from "react-redux";
import {
  performGetPokemonsAction,
  performGetPokemonAction,
  performGetPokemonMoveAction
} from "./store/pokemon.actions";
import { PokedexState } from "../store/reducers";
import { Pokemon, PokemonMove } from "./services/pokemon.service";
import { PokemonsComponent } from "./pokemons";

interface DispatchProps {
  getPokemons(): void;
  getPokemon(id: number): Pokemon;
  getPokemonMove(id: number): PokemonMove;
}

export type PokemonsProps = PokemonState & DispatchProps;

function mapStateToProps(state: PokedexState): PokemonState {
  return {
    pokemons: getPokemons(state),
    error: getPokemonsError(state),
    next: getPokemonsNext(state),
    previous: getPokemonsPrevious(state),
    loading: getPokemonsLoading(state),
    pokemonMoves: getPokemonMoves(state),
    pokemonsLoaded: getPokemonMovesLoaded(state),
    loadingMoves: getLoadingMoves(state)
  };
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getPokemons: () => dispatch(performGetPokemonsAction()),
  getPokemon: id => dispatch(performGetPokemonAction(id)),
  getPokemonMove: moveId => dispatch(performGetPokemonMoveAction(moveId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonsComponent);
