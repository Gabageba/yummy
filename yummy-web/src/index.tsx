import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import '@styles/index.scss';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { setupStore } from '@api/store';
import { antdTheme } from '@utils/antdTheme';
import App from './App';
import './i18n';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback="...is loading">
        <ConfigProvider theme={antdTheme} componentSize="large">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </Suspense>
    </Provider>
  </React.StrictMode>,
);
