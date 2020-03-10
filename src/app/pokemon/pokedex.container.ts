import {
  PokemonState,
  getPokemons,
  getPokemonsError,
  getPokemonsNext,
  getPokemonsPrevious,
  getPokemonsLoading,
  getPokemonMoves,
  getPokemonsLoaded,
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
import { PokedexComponent } from "./pokedex";
import { Pokemon, PokemonMove } from "./services/pokemon.service";

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
    pokemonsLoaded: getPokemonsLoaded(state),
    next: getPokemonsNext(state),
    previous: getPokemonsPrevious(state),
    loading: getPokemonsLoading(state),
    pokemonMoves: getPokemonMoves(state),
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
)(PokedexComponent);
