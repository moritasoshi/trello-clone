import { createContext, useContext } from "react";
import { useBoardsReducer } from "../reducers";
import { BoardsAction, BoardsStore } from "../Types";

const BoardsContext = createContext(
  {} as {
    boardsState: BoardsStore;
    boardsDispatch: React.Dispatch<BoardsAction>;
  }
);

const BoardsProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [boardsState, boardsDispatch] = useBoardsReducer({ boards: [] });

  return (
    <BoardsContext.Provider value={{ boardsState, boardsDispatch }}>
      {children}
    </BoardsContext.Provider>
  );
};

const useBoardsContext = () => useContext(BoardsContext);

export { BoardsProvider, useBoardsContext };
