import './App.css';
import { BrowserRouter as Router, Route, Switch,  Link } from 'react-router-dom';
import Home from "./pages/home";
import CreateSupply from "./pages/CreateSupply";


function App() {

  return (
    <div className="App">
      <Router>
          <div className="navbar">
              <Link to="/"> Товар</Link>
              <Link to="/supply"> Поставка</Link>
              <Link to="/login"> Увійти</Link>
              <Link to="/registration"> Реєстрація</Link>
          </div>
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/supply" exact component={CreateSupply}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
