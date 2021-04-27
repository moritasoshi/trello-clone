import { useEffect, useState } from "react";
import axios from 'axios';
import { Board } from '../Types';
const initialState: Board[] = [{
  board_id: 1,
  board_name: "sample",
  user_id: 1
}, {
  board_id: 2,
  board_name: "sample",
  user_id: 1
}]


const Top: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>(initialState);
  useEffect(() => {
    console.log('副作用関数が実行されました！')
    const fetchBoards = async () => {
      const url = "http://localhost:8080/api/v1/boards"
      const config = {
        headers: {
          Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmb29Ac2FtcGxlLmNvbSIsImV4cCI6MTYxOTkxNzI5OH0.hLaFezhu6RBpLbT4nRuBwizUjpTyD0jOwQmV_jIgKndN4aRmZPfN7MbFcArvwEF0CmP9AC3dDWPoYlelOMFBkA"
        }
      }
      const res_data = await axios.get(url, config)
        .then((response) => {
          return response.data;
        }).catch(err => {
          console.error(err);
        })
      setBoards(res_data);
    };
    fetchBoards();
  }, [])
  return (
    <div>
      <h1>Hello World!</h1>
      { boards.map((board) => (
        <ol key={board.board_id}>
          <li>board_id: {board.board_id}</li>
          <li>board_name: {board.board_name}</li>
          <li>user_id: {board.user_id}</li>
          <hr />
        </ol>
      ))}
    </div>
  )
}
export default Top;