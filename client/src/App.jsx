import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer'
import Withdraw from './components/Withdraw';
import Deposit from './components/Deposit'

function App() {
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
        <Route path ="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
