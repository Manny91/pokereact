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
import { PokedexComponent } from "./pokedex";
import { Pokemon } from "./services/pokemon.service";

interface DispatchProps {
  getPokemons(): void;
  getPokemon(id: number): Pokemon;
}

export type PokemonsProps = PokemonState & DispatchProps;

function mapStateToProps(state: PokedexState): PokemonState {
  return {
    pokemons: getPokemons(state),
    error: getPokemonsError(state),
    pokemonsLoaded: getPokemons(state).length,
    next: getPokemonsNext(state),
    previous: getPokemonsPrevious(state),
    loading: getPokemonsLoading(state)
  };
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getPokemons: () => dispatch(performGetPokemonsAction()),
  getPokemon: id => dispatch(performGetPokemonAction(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokedexComponent);
