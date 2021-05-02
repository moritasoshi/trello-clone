import { useReducer } from "react";
import { BoardsAction, BoardsStore, TokenAction, TokenStore } from "../Types";

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

/**
 * 
 * @param initialBoardsState 
 * @returns 
 */
const useBoardsReducer = (initialBoardsState: BoardsStore) =>
  useReducer(boardsReducer, initialBoardsState);

const tokenReducer: React.Reducer<TokenStore, TokenAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "set":
      return {
        token: action.payload,
      };
    default:
      throw new Error();
  }
};

/**
 * 
 * @param initialTokenState 
 * @returns 
 */
const useTokenReducer = (initialTokenState: TokenStore) =>
  useReducer(tokenReducer, initialTokenState);

export { useBoardsReducer, useTokenReducer };
