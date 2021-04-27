import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { Board } from '../Types';

const useStyles = makeStyles({
  root: {
    width: 220,
    minHeight: 140,
    backgroundColor: '#00CC00',
  },
  title: {
    fontSize: 17,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    textTransform: 'none',
  }
});

type Props = {
  board: Board,
}

export default function SimpleCard(props: Props) {
  const history = useHistory();
  const classes = useStyles();
  const { board } = props;

  const handleOnClick = () => {
    const board_id = board.board_id;
    history.push("/?" + board_id)
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {board.board_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" className={classes.button} onClick={handleOnClick}>View this board</Button>
      </CardActions>
    </Card>
  );
}
