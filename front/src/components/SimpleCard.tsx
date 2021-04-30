import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Item, Row } from "@mui-treasury/components/flex";
import cx from "clsx";
import React from "react";
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
  const deleteCard = () => {
    console.log(`Delete card (card_id: ${card.card_id})`);
  };
  return (
    <Row gap={2} p={2.5}>
      <Item></Item>
      <Row wrap grow gap={0.5} minWidth={0}>
        <Item grow minWidth={0}>
          <div className={cx(styles.card_name, styles.text)}>{card_name}</div>
        </Item>
        <Item position={"middle"}>
          <Button
            className={styles.btn}
            variant={"outlined"}
            onClick={deleteCard}
          >
            Delete
          </Button>
        </Item>
      </Row>
    </Row>
  );
};

export default SimpleCard;
