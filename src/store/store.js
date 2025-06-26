import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';
import musicReducer from './musicSlice';     
import userReducer from './userSlice';
import playlistReducer from './playlistSlice';
import loadingReducer from "./loadingSlice"
import socketReducer from "./socketSlice"
import roomReducer from "./roomSlice"

const rootReducer = combineReducers({
  music: musicReducer,
  socket:socketReducer,
  user: userReducer,
  playlist: playlistReducer,
  loading:loadingReducer,
  room:roomReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['music','user', 'playlist','room'], 
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

