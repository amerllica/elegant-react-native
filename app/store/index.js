import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {configureStore, getDefaultMiddleware} from 'redux-starter-kit';

import rootSaga from 'store/sagas/index';
import rootReducers from 'store/reducers';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'elegant',
  storage: AsyncStorage,
  whitelist: ['user', 'todos'],
};

const persistedReducers = persistReducer(persistConfig, rootReducers);

const defaultMiddlewareConfig = {
  ignoreSerializable: ['persist/PERSIST'],
};

const middleware = [
  sagaMiddleware,
  ...getDefaultMiddleware(defaultMiddlewareConfig),
  logger,
];

const store = configureStore({
  reducer: persistedReducers,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export {store, persistor};
