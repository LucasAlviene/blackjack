import { createRoot } from 'react-dom/client';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import App from './app';

import './styles/main.scss';
import { Provider } from 'react-redux';
import RootStore from './store/Root.store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={RootStore}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);