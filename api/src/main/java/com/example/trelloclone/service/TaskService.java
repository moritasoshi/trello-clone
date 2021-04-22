package com.example.trelloclone.service;

import com.example.trelloclone.dao.BoardDao;
import com.example.trelloclone.dao.CardDao;
import com.example.trelloclone.dao.TileDao;
import com.example.trelloclone.entity.Board;
import com.example.trelloclone.entity.Card;
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
    private CardDao cardDao;

    @Autowired
    public TaskService(BoardDao boardDao, TileDao tileDao, CardDao cardDao) {
        this.boardDao = boardDao;
        this.tileDao = tileDao;
        this.cardDao = cardDao;
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


    /**
     * Cardを新規作成する
     *
     * @param card Card
     */
    @Transactional
    public Card createCard(Card card) {
        Card newCard = card;
        // check tile
        Tile tile = tileDao.findByTileId(card.getTile_id());
        if (Objects.isNull(tile)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, String.format("tile_id: %d doesn't exist.", card.getTile_id()));
        }

        // set card_order
        int maxOrder = cardDao.fetchMaxCardOrderByTileId(card.getTile_id());
        int cardOrder = maxOrder + 1;
        newCard.setCard_order(cardOrder);

        // insert
        cardDao.insert(card);
        return cardDao.findLatest();
    }
}
