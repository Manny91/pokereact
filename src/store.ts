import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

export let store = null;

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION__"] || compose;
  store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(sagas);

  return store;
}
