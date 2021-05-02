import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import SimpleBoard from "../components/SimpleBoard";
import { useBoardsContext } from "../context/BoardsContext";
import { useTokenContext } from "../context/TokenContext";
import { Board } from "../Types";

const useStyles = makeStyles({
  card: {
    margin: 30,
  },
});
type Props = {
  boards: Board[];
  deleteBoard: (board: Board) => void;
};
const BoardListPage: React.FC<Props> = (props: Props) => {
  const { boards, deleteBoard } = props;
  const classes = useStyles();

  const { boardsState, boardsDispatch } = useBoardsContext();
  const { tokenState, tokenDispatch } = useTokenContext();

  useEffect(() => {
    if (tokenState.token) {
      fetchBoards();
    }
    return () => {};
  }, [tokenState.token]);

  const fetchBoards = async () => {
    const url = "http://localhost:8080/api/v1/boards";
    const config = {
      headers: {
        Authorization: tokenState.token,
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
    <React.Fragment>
      {boardsState.boards.map((board) => (
        <div className={classes.card} key={board.board_id}>
          <SimpleBoard board={board} deleteBoard={deleteBoard} />
        </div>
      ))}
    </React.Fragment>
  );
};
export default BoardListPage;
