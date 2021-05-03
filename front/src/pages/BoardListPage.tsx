import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import SimpleBoard from "../components/SimpleBoard";
import { api_base_url } from "../config";
import { useBoardsContext } from "../context/BoardsContext";
import { useTokenContext } from "../context/TokenContext";

const useStyles = makeStyles({
  card: {
    margin: 30,
  },
});

const BoardListPage: React.FC = () => {
  const classes = useStyles();

  const { boardsState, boardsDispatch } = useBoardsContext();
  const { tokenState } = useTokenContext();

  useEffect(() => {
    if (tokenState.token) {
      fetchBoards();
    }
    return () => {};
  }, [tokenState.token]);

  const fetchBoards = async () => {
    const url = api_base_url + "/boards";
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
    boardsDispatch({ type: "clear" });
    for (const board of boards_data) {
      boardsDispatch({ type: "add", payload: board });
    }
  };

  return (
    <React.Fragment>
      {boardsState.boards.map((board) => (
        <div className={classes.card} key={board.board_id}>
          <SimpleBoard board={board} />
        </div>
      ))}
    </React.Fragment>
  );
};
export default BoardListPage;
