import './App.css';
import Header from './component/Header.js';
import Home from './component/Home.js';
import Register from './component/Register.js';
import Login from './component/Login.js';
import Dashboard from './component/Dashboard.js';
import Search from './component/Search.js';
import Side from "./component/SideNav.js";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { createStore } from 'redux';
import allReducers from './component/reducers';
import { Provider } from 'react-redux';

const store = createStore(
  allReducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <div className="App"> 
      <Provider store={store}>
        <Router>
            <Header/>
            <Side/>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/Register" exact component={Register}/>
              <Route path="/Login" exact component={Login}/>
              <Route path="/Dashboard" exact component={Dashboard}/>
              <Route path="/Search" exact component={Search}/>
            </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
