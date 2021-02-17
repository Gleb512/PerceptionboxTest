import './App.css';
import store from "./redax/store";
import {Provider} from "react-redux";
import {BrowserRouter, NavLink} from "react-router-dom";
import Content from "./components/content";
import AppHeader from "./components/header/header";



function App() {
  return (
      <BrowserRouter>
          <Provider store={store}>
              <div className="App">
                  <AppHeader login={store.getState().login} />
                  <div className="container">
                      <Content />
                  </div>
              </div>
          </Provider>
      </BrowserRouter>
  );
}

export default App;
