import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Header from './components/Header';
import Withdraw from './components/Withdraw';
import Deposit from './components/Deposit'
import Rules from './components/Rules'
import Strategy from './components/Strategy'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Blackjack Switch"
    }, [])
    
  return (
    <Router> 
    <div className="App">
      <Header />
      <Switch>
        <Route path ="/login">
          <Login />
        </Route>
        <Route path ="/deposit">
          <Deposit />
        </Route>
        <Route path ="/withdraw">
          <Withdraw />
        </Route>
        <Route path ="/rules">
          <Rules />
        </Route>
        <Route path ="/strategy">
          <Strategy />
        </Route>
        <Route path ="/">
          <Home />
        </Route>
      </Switch>
      <div id="portal"></div>
    </div>
    </Router>
  );
}

export default App;
