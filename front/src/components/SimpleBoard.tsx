import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useHistory } from "react-router-dom";
import { Board } from "../Types";

const useStyles = makeStyles({
  root: {
    width: 220,
    minHeight: 140,
    backgroundColor: "#00CC00",
  },
  title: {
    fontSize: 17,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    textTransform: "none",
  },
});

type Props = {
  board: Board;
  deleteBoard: (board: Board) => void;
};

export default function SimpleBoard(props: Props) {
  const history = useHistory();
  const classes = useStyles();
  const { board, deleteBoard } = props;

  const handleOnClick = () => {
    const board_id = board.board_id;
    history.push("/board/" + board_id);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {board.board_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleOnClick}
        >
          View this board
        </Button>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={() => deleteBoard(board)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}