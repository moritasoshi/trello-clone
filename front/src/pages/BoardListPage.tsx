import { useEffect, useState } from "react";
import axios from 'axios';
import { Board } from '../Types';
import SimpleCard from '../components/SimpleBoard';
import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const initialState: Board[] = [{
  board_id: 1,
  board_name: "sample",
  user_id: 1
}]

const useStyles = makeStyles({
  card: {
    margin: 30
  }
})

const BoardListPage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  // state
  const [boards, setBoards] = useState<Board[]>(initialState);

  // side-effects
  useEffect(() => {
    console.log("副作用関数が実行されました！");
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

    fetchBoards();
  }, []);

  return (
    <React.Fragment>
      {boards.map((board) => (
        <div className={classes.card}>
          <SimpleCard board={board} key={board.board_id} />
        </div>
      ))}
    </React.Fragment>
  );
};
export default BoardListPage;