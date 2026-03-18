import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import '@styles/index.scss';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore, setStore } from '@api/store';
import AntdConfigProvider from '@components/core/AntdConfigProvider';
import { injectCSSVariables } from '@theme/injectCSSVariables';
import FullScreenSpin from '@components/core/FullScreenSpin';
import App from './App';
import './i18n';

injectCSSVariables();

const store = setupStore();
setStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<FullScreenSpin />}>
        <AntdConfigProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AntdConfigProvider>
      </Suspense>
    </Provider>
  </React.StrictMode>,
);
