import React from 'react';
import Layout from './layout/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Contacts from './components/views/Contacts';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>

          <Route path="/" component={Contacts}></Route>

        </Switch>
      </Layout>
    </Router>

  );
}

export default App;
