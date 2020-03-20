import React, {Fragment} from 'react';
import './styles/App.css';
import './styles/normalize.css';
import './styles/skeleton.css';
//import Sidebar from './components/Sidebar.js';
import Form from './form.js';
import MapContainer from './components/map.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function App() {
      return(
          <Router>
              <div className="top">
              <aside>
                  <ul>
                      <li>
                          <Link to ="/map">Map</Link>
                      </li>
                      <li>
                          <Link to ="/form">Form</Link>
                      </li>
                  </ul>
              </aside>

                  <Switch>
                      <Route path="/map">
                        <MapContainer />
                      </Route>
                      <Route path="/form">
                        <Form />
                      </Route>
                  </Switch>
              </div>
          </Router>
      )
}
//export default App;

// <Fragment>
//     <Sidebar/>
//     <div className="App">
//         <h2>Total Users Counter</h2>
//         <MapContainer/>
//         <Form/>
//     </div>
// </Fragment>
