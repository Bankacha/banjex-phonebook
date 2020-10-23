import React from 'react';
import Layout from './layout/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './components/views/Home';
import Contacts from './components/views/Contacts';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateNew from './components/views/CreateNewContacts';


function App() {
  return (
    <Router>
      <Layout>
        <Switch>

          <Route path="/contacts">
            <Contacts />
          </Route>

          <Route path="/" exact={true}>
            <Home />
          </Route>

          <Route path="/CreateNewContacts">
            <CreateNew />
          </Route>

        </Switch>
      </Layout>
    </Router>

  );
}

export default App;
