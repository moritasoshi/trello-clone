package com.example.trelloclone.service;

import com.example.trelloclone.dao.BoardDao;
import com.example.trelloclone.dao.TileDao;
import com.example.trelloclone.entity.Board;
import com.example.trelloclone.entity.Tile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@Service
public class TaskService {
    private BoardDao boardDao;
    private TileDao tileDao;

    @Autowired
    public TaskService(BoardDao boardDao, TileDao tileDao) {
        this.boardDao = boardDao;
        this.tileDao = tileDao;
    }

    //////////////////////
    //// fetch
    //////////////////////

    /**
     * Boardを取得する
     *
     * @param board_id Board id
     * @return Board
     */
    public Board fetchBoard(Integer board_id) {
        return boardDao.findByBoardId(board_id);
    }

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

    /**
     * Tileを新規作成する
     *
     * @param tile Tile
     */
    @Transactional
    public Tile createTile(Tile tile) {
        Tile newTile = tile;
        // check board
        Board board = boardDao.findByBoardId(tile.getBoard_id());
        if (Objects.isNull(board)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, String.format("board_id: %d doesn't exist.", tile.getBoard_id()));
        }

        // set tile_order
        int maxOrder = tileDao.fetchMaxTileOrderByBoardId(tile.getBoard_id());
        int tileOrder = maxOrder + 1;
        newTile.setTile_order(tileOrder);

        // insert
        tileDao.insert(tile);
        return tileDao.findLatest();
    }
}
