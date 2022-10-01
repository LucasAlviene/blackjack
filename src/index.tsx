import { createRoot } from 'react-dom/client';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import App from './app';

import './styles/main.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);