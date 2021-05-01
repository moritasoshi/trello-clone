import axios from "axios";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import BoardListPage from "./pages/BoardListPage";
import BoardPage from "./pages/BoardPage";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
import { useBoardsReducer } from "./reducers/index";
import Header from "./templates/Header";
import { Board } from "./Types";

const initialBoardsState = {
  boards: [],
};

const App: React.FC = () => {
  const [state, dispatch] = useBoardsReducer(initialBoardsState);

  const deleteBoard = (board: Board) => {
    dispatch({ type: "delete", board: board });
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
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmb29Ac2FtcGxlLmNvbSIsImV4cCI6MTYxOTkxNzI5OH0.hLaFezhu6RBpLbT4nRuBwizUjpTyD0jOwQmV_jIgKndN4aRmZPfN7MbFcArvwEF0CmP9AC3dDWPoYlelOMFBkA",
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
      dispatch({ type: "add", board: board });
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header title={"Trello Clone"} />
          <BoardListPage boards={state.boards} deleteBoard={deleteBoard} />
        </Route>
        <Route exact path="/board/:board_id">
          <Header title={"Trello Clone"} />
          <DynamicBoardPage boards={state.boards} />
        </Route>
        <Route exact path="/sign-in">
          <SignInSide />
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
