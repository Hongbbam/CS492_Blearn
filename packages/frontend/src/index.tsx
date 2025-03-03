/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { IoProvider } from 'socket.io-react-hook';

import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './index.css';
import './css/noto-sans-kr.css';
import './css/twemoji-awesome.css';

if (document.documentElement.style) {
  document.documentElement.style.setProperty('--vh', '1vh');
  if (window) {
    document.documentElement.style.setProperty('--wh', `${window.innerHeight / 100}px`);
  }
}

ReactDOM.render(
  <React.StrictMode>
    <IoProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </IoProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
