import {
  BrowserRouter,
  Switch,
  Route,
  RouteProps,
  Redirect,
  useParams,
} from "react-router-dom";
import axios from "axios";
import Header from "./templates/Header";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
import BoardListPage from "./pages/BoardListPage";
import BoardPage from "./pages/BoardPage";
import { Board, User } from "./Types";
import React, { useEffect, useReducer, useState } from "react";

const initialState = {
  boards: [],
};
type Store = {
  boards: Board[];
};
type Action = {
  type: string;
  board: Board;
};

const reducer: React.Reducer<Store, Action> = (state, action) => {
  switch (action.type) {
    case "delete":
      return {
        boards: state.boards.filter(
          (board) => board.board_id !== action.board.board_id
        ),
      };
    case "add":
      const newBoards = [...state.boards];
      newBoards.push(action.board);
      return { boards: newBoards };
    default:
      throw new Error();
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
