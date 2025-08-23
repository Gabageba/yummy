import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import '@styles/index.scss';
import { Provider } from 'react-redux';
import { setupStore } from '@store/store.ts';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback="...is loading">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </Provider>
  </React.StrictMode>,
);
