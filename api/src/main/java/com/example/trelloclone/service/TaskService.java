package com.example.trelloclone.service;

import com.example.trelloclone.dao.BoardDao;
import com.example.trelloclone.entity.Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskService {
    private BoardDao boardDao;

    @Autowired
    public TaskService(BoardDao boardDao) {
        this.boardDao = boardDao;
    }

    //////////////////////
    //// fetch
    //////////////////////

//    /**
//     * Boardを取得する
//     * @param board_id Board id
//     * @return Board
//     */
//    public Board fetchBoard(Integer board_id){
//        return boardDao.findById(board_id);
//    }

    /**
     * Boardを新規作成する
     *
     * @param board Board
     */
    @Transactional
    public Board createBoard(Board board) {
        boardDao.insert(board);
        return boardDao.findLatest();
    }

}
