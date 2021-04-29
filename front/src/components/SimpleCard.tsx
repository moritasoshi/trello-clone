import React from "react";
import cx from "clsx";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { Card } from "../Types";

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

export default SimpleCard;
