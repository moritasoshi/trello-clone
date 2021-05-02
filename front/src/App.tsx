import axios from "axios";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import { AuthUserProvider } from "./context/AuthUserContext";
import { TokenProvider } from "./context/TokenContext";
import BoardListPage from "./pages/BoardListPage";
import BoardPage from "./pages/BoardPage";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
import { useBoardsReducer } from "./reducers/index";
import Header from "./templates/Header";
import { Board } from "./Types";

const App: React.FC = () => {
  const [boardsState, boardsDispatch] = useBoardsReducer({ boards: [] });

  const deleteBoard = (board: Board) => {
    boardsDispatch({ type: "delete", board: board });
  };

  useEffect(() => {
    fetchBoards();
    return () => {};
  }, []);

  const fetchBoards = async () => {
    const url = "http://localhost:8080/api/v1/boards";
    const config = {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmb29Ac2FtcGxlLmNvbSIsImV4cCI6MTYyMDgxMjk0N30.hDAJCokHfEv8eLme0e4Obf83XQWSKW5dj8jGQOy6-ndY5vcTTmpw8Ucsb2vEneahmFgNk0MbZCF5beqjHI5IaA",
      },
    };
    const boards_data = await axios
      .get(url, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
    for (const board of boards_data) {
      boardsDispatch({ type: "add", board: board });
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <TokenProvider>
            <Header title={"Trello Clone"} />
            <BoardListPage
              boards={boardsState.boards}
              deleteBoard={deleteBoard}
            />
          </TokenProvider>
        </Route>
        <Route exact path="/board/:board_id">
          <Header title={"Trello Clone"} />
          <DynamicBoardPage boards={boardsState.boards} />
        </Route>
        <Route exact path="/sign-in">
          <TokenProvider>
            <AuthUserProvider>
              <SignInSide />
            </AuthUserProvider>
          </TokenProvider>
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

type Props = {
  boards: Board[];
};
const DynamicBoardPage = ({ boards }: Props) => {
  const { board_id } = useParams<{ board_id: string }>();
  const board_id_number = Number(board_id);

  const board = boards.find((board) => board.board_id === board_id_number);
  if (board) {
    return <BoardPage board={board} />;
  }
  return <div>Error!</div>;
};

export default App;
