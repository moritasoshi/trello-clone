import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Board, Tile } from "../Types";
import SimpleTile from "../components/SimpleTile";
import { Row } from "@mui-treasury/components/flex";

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
  const history = useHistory();
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
