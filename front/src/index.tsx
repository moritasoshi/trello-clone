import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import SignInSide from './pages/SignInSide';
import SignUp from './pages/SignUp';
import Header from './templates/Header';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Header title={'Trello Clone'} />
        Hello World!
      </Route>
      <Route exact path="/sign-in">
        <SignInSide />
      </Route>
      <Route exact path="/sign-up">
        <SignUp />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
