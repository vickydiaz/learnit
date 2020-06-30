import { Provider } from 'react-redux';
import { store } from './store';

import React from 'react';
import './main.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Header from './components/layout/Header';
import Vocabulary from './components/pages/Vocabulary';
import AddWords from './components/pages/AddWords';
import WordList from './components/pages/WordList';

const App = () => {
  return (
    <Provider store={store}>
     <Router>
        <div>
        <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/vocabulary' component={Vocabulary} />
            <Route exact path='/vocabulary/:title' component={WordList} />
            <Route exact path='/add-words/:title' component={AddWords} />
            {/* <Route exact path='/list' component={WordList} /> */}
          </Switch>
        </div>
      </Router>
      </Provider>
  );
}

export default App;
