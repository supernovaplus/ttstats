import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable';

import React from 'react';
import { createRoot } from 'react-dom/client';
import './scss/index.scss';
import './scss/sidebar.scss';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
