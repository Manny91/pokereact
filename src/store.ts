import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducers } from "./app/store/reducers";
import sagas from "./app/store/sagas";
import { composeWithDevTools } from "redux-devtools-extension";

let store = null;

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware)
      // other store enhancers if any
    )
  );

  sagaMiddleware.run(sagas);

  return store;
}
