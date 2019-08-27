import {
  PokemonState,
  getPokemons,
  getPokemonsError,
  getPokemonsNext,
  getPokemonsPrevious,
  getPokemonsLoading,
  getPokemonsLoaded
} from "./store/pokemon.store";
import { connect } from "react-redux";
import {
  performGetPokemonsAction,
  performGetPokemonAction
} from "./store/pokemon.actions";
import { PokedexState } from "../store/reducers";
import { Pokemon } from "./services/pokemon.service";
import { PokemonsComponent } from "./pokemons";

interface DispatchProps {
  getPokemons(): void;
  getPokemon(id: number): Pokemon;
}

export type PokemonsProps = PokemonState & DispatchProps;

function mapStateToProps(state: PokedexState): PokemonState {
  return {
    pokemons: getPokemons(state),
    error: getPokemonsError(state),
    next: getPokemonsNext(state),
    previous: getPokemonsPrevious(state),
    loading: getPokemonsLoading(state),
    pokemonsLoaded: getPokemonsLoaded(state)
  };
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getPokemons: () => dispatch(performGetPokemonsAction()),
  getPokemon: id => dispatch(performGetPokemonAction(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonsComponent);
