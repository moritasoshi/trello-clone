import React from "react";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import { paths } from "./config";
import { AuthUserProvider } from "./context/AuthUserContext";
import { BoardsProvider, useBoardsContext } from "./context/BoardsContext";
import { TokenProvider } from "./context/TokenContext";
import BoardListPage from "./pages/BoardListPage";
import BoardPage from "./pages/BoardPage";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
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
