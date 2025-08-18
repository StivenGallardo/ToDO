import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import storage from 'redux-persist/lib/storage'; // default es localStorage
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { uiSlice } from './ui';
import { workSpaceSlice } from './dashboard';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['workSpace'], // Nombras los reducers que quieres persistir
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  ui: uiSlice.reducer,
  workSpace: workSpaceSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración de la store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);