import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import {App} from './components/templates/App';
import {Providers} from './components/templates/Providers';
import {environment} from './environment/environment';
import './index.css';
import reportWebVitals from './reportWebVitals';

if (environment.analytics) {
    ReactGA.initialize(environment.analytics);
}

ReactDOM.render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
