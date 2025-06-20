import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store'; 
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import "./utils/axiosSetup"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
