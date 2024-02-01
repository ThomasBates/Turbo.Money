import React from 'react'
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import './test.css';

import App from './src/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)