import './App.css';
import { BrowserRouter as Router, Route, Switch,  Link } from 'react-router-dom';
import Home from "./pages/home";
import CreateSupply from "./pages/CreateSupply";
import Login from "./pages/Login";
import Registr from "./pages/Registr";
import CreateOrd from "./pages/CreateOrd";
import {AuthContext} from "./helpers/AuthContext";
import {useEffect, useState} from "react";

function App() {

    const [authState, setAuthState] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('accessToken')) {
            setAuthState(true);
        }
    }, [])

    const logout = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('password');
        setAuthState(false);
    };

  return (
    <div className="App">
        <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
          <div className="navbar">
              <Link to='/order'> Продажа</Link>
              <Link to="/"> Товар</Link>
              <Link to="/supply"> Поставка</Link>
              { !authState ? (
                  <div className="loggedInContainer" >
                  <Link to="/login"> Увійти</Link>
                  <Link to="/registration"> Реєстрація</Link>
                  </div>
                  ) : (
                      <div className='loggedInContainer'>
                      <Link>User: {sessionStorage.getItem('login')}</Link>
                      <button className='buttonLogout' onClick={logout}> Вийти</button>
                      </div>
              )
              }
          </div>
          <Switch>
              <Route path="/order" exact component={CreateOrd}></Route>
              <Route path="/" exact component={Home}/>
              <Route path="/supply" exact component={CreateSupply}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/registration" exact component={Registr}/>
          </Switch>
      </Router>
        </AuthContext.Provider>
    </div>
  );
}

export default App;
