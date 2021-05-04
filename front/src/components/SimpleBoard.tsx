import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { CallMade, Delete } from "@material-ui/icons";
import { Column, Item, Row } from "@mui-treasury/components/flex";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";
import React from "react";
import { useHistory } from "react-router-dom";
import { useBoardsContext } from "../context/BoardsContext";
import { Board } from "../Types";

const StyledTooltip = withStyles({
  tooltip: {
    marginTop: "0.2rem",
    backgroundColor: "rgba(0,0,0,0.72)",
    color: "#fff",
  },
})(Tooltip);

const useStyles = makeStyles({
  card: {
    width: "250px",
    borderRadius: 16,
    boxShadow: "0 8px 16px 0 #BDC9D7",
    overflow: "hidden",
  },
  header: {
    fontFamily: "Barlow, san-serif",
    backgroundColor: "#e1fcfa",
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
  btn: {
    borderRadius: 20,
    padding: "0.125rem 0.75rem",
    borderColor: "#becddc",
    fontSize: "0.75rem",
    textTransform: "none",
  },
  subheader: {
    fontSize: "0.875rem",
    color: "#495869",
  },
});

type Props = {
  board: Board;
};

export default function SimpleBoard(props: Props) {
  const history = useHistory();
  const styles = useStyles();
  const iconBtnStyles = useSizedIconButtonStyles({
    padding: 8,
    childSize: 20,
  });

  const { board } = props;
  const { boardsState, boardsDispatch } = useBoardsContext();

  const handleOnClick = () => {
    const board_id = board.board_id;
    history.push("/board/" + board_id);
  };

  const deleteBoard = () => {
    boardsDispatch({ type: "delete", payload: board });
  };

  return (
    <Column p={0} gap={1.5} m={2} className={styles.card}>
      <Row wrap p={2} alignItems={"baseline"} className={styles.header}>
        <Item stretched position={"middle"} className={styles.headline}>
          {board.board_name}
        </Item>
        <Item position={"right"} mr={-0.5}>
          <StyledTooltip title={"Delete"}>
            <IconButton classes={iconBtnStyles} onClick={deleteBoard}>
              <Delete />
            </IconButton>
          </StyledTooltip>
          <StyledTooltip title={"See details"}>
            <IconButton classes={iconBtnStyles} onClick={handleOnClick}>
              <CallMade />
            </IconButton>
          </StyledTooltip>
        </Item>
      </Row>
      <Row wrap p={1} alignItems={"baseline"} className={styles.header}>
        <Item position={"middle"}>
          <Typography className={styles.subheader}>
            This is {board.board_name}
          </Typography>
        </Item>
      </Row>
    </Column>
  );
}
