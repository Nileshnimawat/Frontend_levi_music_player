import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';
import musicReducer from './musicSlice';     // ✅ Import your slices
import userReducer from './userSlice';
import playlistReducer from './playlistSlice';

const rootReducer = combineReducers({
  music: musicReducer,

  user: userReducer,
  playlist: playlistReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['music','user','playlist'], // ✅ Only these slices will persist
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

