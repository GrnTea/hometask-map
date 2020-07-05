import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
//import {store} from './store.js';
import Form from './components/formredux.js';
import ChartContainer from './components/chartredux.js';

import './styles/App.css';
import './styles/normalize.css';
import './styles/skeleton.css';
/*
ReactDOM.render(
  <Provider store={store}>
          <Router>
            <div>
                <Switch>
                    <Route path="/map">
                      {<ChartContainer />}
                    </Route>
                    <Route path="/form">
                      <Form />
                    </Route>
                </Switch>
            </div>
          </Router>
  </Provider>,
  document.getElementById('root')
)
*/
////
const App = ({store}) => {
  return(
    <Provider store={store}>
        <div className="top">
          <aside>
              <ul>
                  <li>
                      <a href="/map">Maps</a>
                  </li>
                  <li>
                      <a href="/form">Form</a>
                  </li>
              </ul>
          </aside>
        </div>

      <Router>
            <div>
                <Switch>
                    <Route path="/map">
                      <ChartContainer />
                    </Route>
                    <Route path="/form">
                      <Form />
                    </Route>
                </Switch>
            </div>
      </Router>
    </Provider>
  )
}

export default App