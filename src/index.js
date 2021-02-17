import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redax/store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

let rerenderTree = () =>{
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    document.getElementById('root'));
}

rerenderTree(store.getState() );

store.subscribe( () => {
    let state = store.getState();
    rerenderTree(state);
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
