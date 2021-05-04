import React from "react";
import { useParams } from "react-router-dom";
import { useBoardsContext } from "../context/BoardsContext";
import BoardPage from "../pages/BoardPage";

// DynamicBoardPageの実装
const DynamicBoardPage: React.FC = () => {
  const { board_id } = useParams<{ board_id: string }>();
  const board_id_number = Number(board_id);

  const { boardsState } = useBoardsContext();

  const board = boardsState.boards.find(
    (board) => board.board_id === board_id_number
  );
  if (board) {
    return <BoardPage board={board} />;
  }
  return <div>Board Not Found!</div>;
};

export default DynamicBoardPage;
