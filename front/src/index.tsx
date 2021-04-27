import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from 'react-router-dom';

import axios from 'axios';
import Header from './templates/Header';
import SignInSide from './pages/SignInSide';
import SignUp from './pages/SignUp';
import Top from './pages/Top';
import { User } from './Types';

// PrivateRouteの実装
const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const authUser = useAuthUser()
  const isAuthenticated = authUser != null //認証されているかの判定
  if (isAuthenticated) {
    return <Route {...props} />
  } else {
    console.log(`ログインしていないユーザーは${props.path}へはアクセスできません`)
    return <Redirect to="/sign-in" />
  }
}
const useAuthUser = () => {
  const [authUser, setAuthUser] = useState<User>({ email: "", password: "" });
  const newUser: User = {
    email: "",
    password: ""
  }
  const url: string = "http://localhost:8080/api/v1/auth/login";
  axios.post(url, newUser)
    .then((result) => {
      console.log(result);

    })
    .catch((err) => {
      console.error(err)
    })
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Header title={'Trello Clone'} />
        <Top />
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
