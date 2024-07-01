// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseProvider, AuthProvider } from './store/Context';

ReactDOM.render(
  <FirebaseProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </FirebaseProvider>,
  document.getElementById('root')
);
