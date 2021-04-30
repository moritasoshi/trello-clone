import React from "react";
import NoSsr from "@material-ui/core/NoSsr";
import GoogleFontLoader from "react-google-font-loader";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { Card, Tile } from "../Types";
import SimpleCard from "./SimpleCard";

const useTileStyles = makeStyles(() => ({
  card: {
    width: "250px",
    borderRadius: 16,
    boxShadow: "0 8px 16px 0 #BDC9D7",
    overflow: "hidden",
  },
  header: {
    fontFamily: "Barlow, san-serif",
    backgroundColor: "#fff",
  },
  headline: {
    color: "#122740",
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  link: {
    color: "#2281bb",
    padding: "0 0.25rem",
    fontSize: "0.875rem",
  },
  actions: {
    color: "#BDC9D7",
  },
  divider: {
    backgroundColor: "#d9e2ee",
    margin: "0 20px",
  },
}));

type SimpleTileProps = {
  tile: Tile;
};
const SimpleTile = (props: SimpleTileProps) => {
  const styles = useTileStyles();
  const { tile } = props;
  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Barlow", weights: [400, 600] }]} />
      </NoSsr>
      <Column p={0} gap={1.5} m={2} className={styles.card}>
        <Row wrap p={2} alignItems={"baseline"} className={styles.header}>
          <Item stretched className={styles.headline}>
            {tile.tile_name}
          </Item>
          <Item className={styles.actions}>
            <Link className={styles.link}>Refresh</Link> •{" "}
            <Link className={styles.link}>See all</Link>
          </Item>
        </Row>
        {tile.cards?.map((card: Card, index: number) => (
          <div key={card.card_id}>
            <SimpleCard card={card} />
            {tile.cards?.length !== index + 1 && (
              <Divider variant={"middle"} className={styles.divider} />
            )}
          </div>
        ))}
      </Column>
    </>
  );
};

export default SimpleTile;
