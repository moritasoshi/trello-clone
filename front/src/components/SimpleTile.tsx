import React from "react";
import cx from "clsx";
import NoSsr from "@material-ui/core/NoSsr";
import GoogleFontLoader from "react-google-font-loader";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { Card, Tile } from "../Types";

const useCardStyles = makeStyles(() => ({
  text: {
    fontFamily: "Barlow, san-serif",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  card_name: {
    fontWeight: 600,
    fontSize: "1rem",
    color: "#122740",
  },
  caption: {
    fontSize: "0.875rem",
    color: "#758392",
    marginTop: -4,
  },
  btn: {
    borderRadius: 20,
    padding: "0.125rem 0.75rem",
    borderColor: "#becddc",
    fontSize: "0.75rem",
  },
}));

type SimpleCardProps = {
  card: Card;
};

const SimpleCard = ({ card }: SimpleCardProps) => {
  const { card_name } = card;
  const styles = useCardStyles();
  return (
    <Row gap={2} p={2.5}>
      <Item></Item>
      <Row wrap grow gap={0.5} minWidth={0}>
        <Item grow minWidth={0}>
          <div className={cx(styles.card_name, styles.text)}>{card_name}</div>
        </Item>
        <Item position={"middle"}>
          <Button className={styles.btn} variant={"outlined"}>
            Delete
          </Button>
        </Item>
      </Row>
    </Row>
  );
};

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
      <Column p={0} gap={0} className={styles.card}>
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
          <>
            <SimpleCard card={card} />
            {tile.cards?.length !== index + 1 && (
              <Divider variant={"middle"} className={styles.divider} />
            )}
          </>
        ))}
      </Column>
    </>
  );
};

export default SimpleTile;
