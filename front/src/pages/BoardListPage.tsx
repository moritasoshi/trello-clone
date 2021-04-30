import { makeStyles } from "@material-ui/core";
import React from "react";
import SimpleBoard from "../components/SimpleBoard";
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
