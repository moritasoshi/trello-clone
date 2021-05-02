import React from "react";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import { AuthUserProvider } from "./context/AuthUserContext";
import { BoardsProvider, useBoardsContext } from "./context/BoardsContext";
import { TokenProvider } from "./context/TokenContext";
import BoardListPage from "./pages/BoardListPage";
import BoardPage from "./pages/BoardPage";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
import Header from "./templates/Header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AuthUserProvider>
          <BoardsProvider>
            <TokenProvider>
              <Route exact path="/">
                <Header title={"Trello Clone"} />
                <BoardListPage />
              </Route>
              <Route exact path="/board/:board_id">
                <Header title={"Trello Clone"} />
                <DynamicBoardPage />
              </Route>
              <Route exact path="/sign-in">
                <SignInSide />
              </Route>
              <Route exact path="/sign-up">
                <SignUp />
              </Route>
            </TokenProvider>
          </BoardsProvider>
        </AuthUserProvider>
      </Switch>
    </BrowserRouter>
  );
};

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
