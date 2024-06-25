import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppWithAuthProvider from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppWithAuthProvider />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
