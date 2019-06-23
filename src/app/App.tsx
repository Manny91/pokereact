import React from "react";
import styled, { ThemeProvider } from "../styled.components";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { configureStore } from "../store";
import { theme } from "../theme";
function App() {
  return (
    <Provider store={configureStore()}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Pokemons} />
        </Switch>
      </ThemeProvider>
    </Provider>
  );
}

const Base = styled.div`
  @media ${props => props.theme.media.md} {
    display: grid;
    height: 100vh;
    grid-template-rows: 65px auto;
    grid-template-columns: 215px auto;
    grid-template-areas:
      "header header"
      "content content";
  }

  @media ${props => props.theme.media.lg} {
    grid-template-rows: 70px auto;
    grid-template-columns: 215px auto;
    grid-template-areas:
      "header header"
      "sidebar content";
  }
`;

const Content = styled.main`
  grid-area: content;
  background-color: ${props => props.theme.colors.white};
`;

export default App;
