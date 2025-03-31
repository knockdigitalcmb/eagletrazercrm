import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeHandler from './assets/scss/Theme/ThemeHandler';
import { SnackbarProvider } from 'notistack';
import './index.scss';
import App from './App';
import { store } from './store';
import './i18n';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading Shell...</div>}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <HashRouter>
          <ThemeHandler>
            <Provider store={store}>
              <App />
            </Provider>
          </ThemeHandler>
        </HashRouter>
      </SnackbarProvider>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
