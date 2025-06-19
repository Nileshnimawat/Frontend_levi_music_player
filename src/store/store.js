import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';
import musicReducer from './musicSlice';     // ✅ Import your slices
import userReducer from './userSlice';
import playlistReducer from './playlistSlice';
import loadingReducer from "./loadingSlice"

const rootReducer = combineReducers({
  music: musicReducer,

  user: userReducer,
  playlist: playlistReducer,
  loading:loadingReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['music','user','playlist'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

