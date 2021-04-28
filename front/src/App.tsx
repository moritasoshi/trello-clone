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
import { useEffect, useState } from "react";

const initialState: Board[] = [
  {
    board_id: 1,
    board_name: "sample",
    user_id: 1,
  },
];

const App = () => {
  const [boards, setBoards] = useState<Board[]>(initialState);
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
    const res_data = await axios
      .get(url, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
    setBoards(res_data);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header title={"Trello Clone"} />
          <BoardListPage />
        </Route>
        <Route exact path="/board/:board_id">
          <Header title={"Trello Clone"} />
          <DynamicBoardPage boards={boards} />
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
  return <div>Error!</div>
};

export default App;
