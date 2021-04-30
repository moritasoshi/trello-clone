import { Board } from "../Types";
import SimpleBoard from "../components/SimpleBoard";
import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

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
  const history = useHistory();
  const classes = useStyles();

  return (
    <React.Fragment>
      {boards.map((board) => (
        <div className={classes.card} key={board.board_id}>
          <SimpleBoard board={board} deleteBoard={deleteBoard} />
        </div>
      ))}
    </React.Fragment>
  );
};
export default BoardListPage;
