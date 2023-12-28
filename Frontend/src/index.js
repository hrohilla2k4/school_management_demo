import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { AuthProvider } from './components/authcontext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <AuthProvider>
    <App />
  </AuthProvider>
);


