import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { paths } from "./config";
import { AuthUserProvider } from "./context/AuthUserContext";
import { BoardsProvider } from "./context/BoardsContext";
import { TokenProvider } from "./context/TokenContext";
import BoardListPage from "./pages/BoardListPage";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
import DynamicBoardPage from "./templates/DynamicBoardPage";
import Header from "./templates/Header";
import PrivateRoute from "./templates/PrivateRoute";

const App: React.FC = () => {
  return (
    <AuthUserProvider>
      <BoardsProvider>
        <TokenProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path={paths.sign_in}>
                <SignInSide />
              </Route>
              <Route exact path={paths.sign_up}>
                <SignUp />
              </Route>
              <PrivateRoute exact path={paths.board_list}>
                <Header title={"Trello Clone"} />
                <BoardListPage />
              </PrivateRoute>
              <PrivateRoute exact path={paths.board}>
                <Header title={"Trello Clone"} />
                <DynamicBoardPage />
              </PrivateRoute>
            </Switch>
          </BrowserRouter>
        </TokenProvider>
      </BoardsProvider>
    </AuthUserProvider>
  );
};

export default App;
