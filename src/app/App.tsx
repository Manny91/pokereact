import React from "react";
import styled, { ThemeProvider } from "../styled.components";

function App() {
  return (
    <Provider store={store(history)}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Pokedex} />
          </Switch>
        </ConnectedRouter>
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
