import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { paths } from "../config";
import { useAuthUserContext } from "../context/AuthUserContext";

// PrivateRouteの実装
const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const { authUserState } = useAuthUserContext();
  const isAuthenticated = authUserState.auth_user != null; //認証されているかの判定
  console.log(authUserState.auth_user);
  console.log(props);
  if (isAuthenticated) {
    return <Route {...props} />;
  } else {
    console.log(
      `ログインしていないユーザーは${props.path}へはアクセスできません`
    );
    return <Redirect to={paths.sign_in} />;
  }
};

export default PrivateRoute;
