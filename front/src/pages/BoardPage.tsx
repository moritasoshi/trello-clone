import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Row } from "@mui-treasury/components/flex";
import React from "react";
import SimpleTile from "../components/SimpleTile";
import { useBoardsContext } from "../context/BoardsContext";
import { Board, Tile } from "../Types";

const useStyles = makeStyles(() => ({
  header: {
    fontFamily: "Barlow, san-serif",
    backgroundColor: "#fff",
  },
}));

type Props = {
  board: Board;
};

export default function BoardPage({ board }: Props) {
  const styles = useStyles();
  const { tiles } = board;
  const { boardsDispatch } = useBoardsContext();

  const addTile = () => {
    console.log("add tile");
    const newTile: Tile = {
      tile_name: "test tile",
      tile_order: 1,
      board_id: board.board_id || 25,
    };
    const newBoard = { ...board };
    newBoard.tiles?.push(newTile);
    boardsDispatch({ type: "save", payload: newBoard });
  };

  return (
    <>
      <Button variant="outlined" onClick={addTile}>
        Add Tile
      </Button>
      <Row wrap p={2} alignItems={"baseline"} className={styles.header}>
        {tiles?.map((tile: Tile) => {
          return <SimpleTile tile={tile} key={tile.tile_id} />;
        })}
      </Row>
    </>
  );
}
