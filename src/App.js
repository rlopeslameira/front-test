import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import ClienteLista from './pages/ClienteLista';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import ClienteCad from './pages/ClienteCad';


function App() {

  return (
    <Router>
      <AppBar position='static'>
        <Toolbar>
          <Typography>Crud Teste</Typography>
          <NavLink style={{color: '#fff', marginLeft: 20, padding: 5,}} to='/' exact>Lista</NavLink>
          <NavLink style={{color: '#fff', marginLeft: 20, padding: 5,}} to='/cad' exact>Cadastro</NavLink>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/cad" component={ClienteCad} />      
        <Route exact path="/" component={ClienteLista} />      
      </Switch>
    </Router>
  );
}

export default App;

