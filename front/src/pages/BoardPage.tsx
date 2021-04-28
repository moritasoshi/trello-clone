import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams } from "react-router-dom";
import { Board, Tile } from "../Types";
import SimpleTile from "../components/SimpleTile";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
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
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
}));

type Props = {
  board: Board;
};

const initialBoard = {
  board_id: 1,
  board_name: "board",
  user_id: 2,
  tiles: [
    {
      tile_id: 1,
      tile_name: "tile",
      tile_order: 1,
      board_id: 1,
      cards: [
        {
          card_id: 1,
          card_name: "card",
          card_order: 1,
          tile_id: 1,
        },
      ],
    },
  ],
};

export default function BoardPage({ board }: Props) {
  const history = useHistory();
  const classes = useStyles();
  const { tiles } = board;

  return (
    <div>
      {tiles?.map((tile: Tile) => {
        return (
          <>
            <SimpleTile tile={tile} />
          </>
        );
      })}
    </div>
  );
}
