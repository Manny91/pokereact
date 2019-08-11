import React from "react";
import styled, { ThemeProvider } from "../styled.components";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { configureStore } from "../store";
import { theme } from "../theme";
import PokemonsContainer from "./pokemon/pokemons.container";
import PokedexContainer from "../app/pokemon/pokedex.container";
function App() {
  return (
    <Provider store={configureStore()}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/pokedex" component={PokedexContainer} />
            <Route exact component={PokemonsContainer} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
