import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
  useParams,
} from "react-router-dom";
import { paths } from "./config";
import {
  AuthUserProvider,
  useAuthUserContext,
} from "./context/AuthUserContext";
import { BoardsProvider, useBoardsContext } from "./context/BoardsContext";
import { TokenProvider } from "./context/TokenContext";
import BoardListPage from "./pages/BoardListPage";
import BoardPage from "./pages/BoardPage";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
import Header from "./templates/Header";

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

// DynamicBoardPageの実装
const DynamicBoardPage: React.FC = () => {
  const { board_id } = useParams<{ board_id: string }>();
  const board_id_number = Number(board_id);

  const { boardsState } = useBoardsContext();

  const board = boardsState.boards.find(
    (board) => board.board_id === board_id_number
  );
  if (board) {
    return <BoardPage board={board} />;
  }
  return <div>Board Not Found!</div>;
};

export default App;
