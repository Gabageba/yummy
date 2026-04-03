import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import '@styles/index.scss';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore, setStore } from '@api/store';
import AntdConfigProvider from '@components/core/AntdConfigProvider';
import { injectCSSVariables } from '@theme/injectCSSVariables';
import FullScreenSpin from '@components/core/FullScreenSpin';
import ThemeModeProvider from '@components/themeMode/ThemeModeProvider';
import App from './App';
import './i18n';

injectCSSVariables();

const store = setupStore();
setStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <AntdConfigProvider>
        <Provider store={store}>
          <Suspense fallback={<FullScreenSpin />}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Suspense>
        </Provider>
      </AntdConfigProvider>
    </ThemeModeProvider>
  </React.StrictMode>,
);
