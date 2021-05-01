import { useReducer } from "react";
import { BoardsAction, BoardsStore } from "../Types";

const boardsReducer: React.Reducer<BoardsStore, BoardsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "delete":
      return {
        boards: state.boards.filter(
          (board) => board.board_id !== action.board.board_id
        ),
      };
    case "add":
      const newBoards = [...state.boards];
      newBoards.push(action.board);
      return { boards: newBoards };
    default:
      throw new Error();
  }
};

export const useBoardsReducer = (initialBoardsState: BoardsStore) =>
  useReducer(boardsReducer, initialBoardsState);
