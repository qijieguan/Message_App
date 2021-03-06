import './App.css';
import Header from './component/Header.js';
import Home from './component/Home.js';
import Register from './component/Register.js';
import Login from './component/Login.js';
import ChatPage from './component/ChatPage.js';
import Search from './component/Search.js';
import Friend from './component/Friend.js';
import About from './component/About.js';
import Profile from './component/Profile';
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
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/Register" exact component={Register}/>
              <Route path="/Login" exact component={Login}/>
              <Route path="/Chatpage" exact component={ChatPage}/>
              <Route path="/Search" exact component={Search}/>
              <Route path="/Friend" exact component={Friend}/>
              <Route path="/About" exact component={About}/>
              <Route path="/Profile" exact component={Profile}/>
            </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
