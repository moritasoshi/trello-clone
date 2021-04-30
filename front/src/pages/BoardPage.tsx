import { makeStyles } from "@material-ui/core/styles";
import { Row } from "@mui-treasury/components/flex";
import React from "react";
import SimpleTile from "../components/SimpleTile";
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

  return (
    <Row wrap p={2} alignItems={"baseline"} className={styles.header}>
      {tiles?.map((tile: Tile) => {
        return <SimpleTile tile={tile} key={tile.tile_id} />;
      })}
    </Row>
  );
}
