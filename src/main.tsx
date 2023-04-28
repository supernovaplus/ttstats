import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('main') as HTMLElement).render(
  //<React.StrictMode> //causes double fetch in dev mode
  <BrowserRouter>
    <App />
  </BrowserRouter>
  //</React.StrictMode>
);
