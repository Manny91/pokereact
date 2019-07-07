import {
  PokemonState,
  getPokemons,
  getPokemonsError,
  getPokemonsNext,
  getPokemonsPrevious,
  getPokemonsLoading
} from "./store/pokemon.store";
import { connect } from "react-redux";
import {
  performGetPokemonsAction,
  performGetPokemonAction
} from "./store/pokemon.actions";
import { PokedexState } from "../store/reducers";
import { PokemonsComponent } from "./pokemons";
import { Pokemon } from "./services/pokemon-service";

interface DispatchProps {
  getPokemons(): void;
  getPokemon(url: string): Pokemon;
}

export type PokemonsProps = PokemonState & DispatchProps;

function mapStateToProps(state: PokedexState): PokemonState {
  return {
    pokemons: getPokemons(state),
    error: getPokemonsError(state),
    next: getPokemonsNext(state),
    previous: getPokemonsPrevious(state),
    loading: getPokemonsLoading(state)
  };
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getPokemons: () => dispatch(performGetPokemonsAction()),
  getPokemon: url => dispatch(performGetPokemonAction(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonsComponent);
