package com.example.trelloclone.service;

import com.example.trelloclone.dao.BoardDao;
import com.example.trelloclone.dao.BoardsDao;
import com.example.trelloclone.dao.CardDao;
import com.example.trelloclone.dao.TileDao;
import com.example.trelloclone.entity.Board;
import com.example.trelloclone.entity.Boards;
import com.example.trelloclone.entity.Card;
import com.example.trelloclone.entity.Tile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaskService {
    private BoardDao boardDao;
    private BoardsDao boardsDao;
    private TileDao tileDao;
    private CardDao cardDao;

    @Autowired
    public TaskService(BoardDao boardDao, BoardsDao boardsDao, TileDao tileDao, CardDao cardDao) {
        this.boardDao = boardDao;
        this.boardsDao = boardsDao;
        this.tileDao = tileDao;
        this.cardDao = cardDao;
    }

    //////////////////////
    //// boards
    //////////////////////

    /**
     * ネストしたTiles,Cardsを持つBoard Listを取得する
     *
     * @param user_id
     * @return
     */
    public List<com.example.trelloclone.domain.Board> fetchBoards(long user_id) {
        List<Boards> rawDataList = boardsDao.findAllBoardsByUserId(user_id);
        List<com.example.trelloclone.domain.Board> rawBoards = new ArrayList<>();
        List<com.example.trelloclone.domain.Tile> rawTiles = new ArrayList<>();
        List<com.example.trelloclone.domain.Card> rawCards = new ArrayList<>();

        //// set boards
        for (Boards rawData : rawDataList) {
            com.example.trelloclone.domain.Board board = new com.example.trelloclone.domain.Board();
            board.setBoard_id(rawData.getBoard_id());
            board.setBoard_name(rawData.getBoard_name());
            board.setUser_id(rawData.getUser_id());
            rawBoards.add(board);
        }

        // to distinct boards
        List<com.example.trelloclone.domain.Board> boards = rawBoards.stream().distinct().collect(Collectors.toList());


        //// set tiles
        for (Boards rawData : rawDataList) {
            com.example.trelloclone.domain.Tile tile = new com.example.trelloclone.domain.Tile();
            tile.setTile_id(rawData.getTile_id());
            tile.setTile_name(rawData.getTile_name());
            tile.setTile_order(rawData.getTile_order());
            tile.setBoard_id(rawData.getBoard_id());
            rawTiles.add(tile);
        }

        // to parallel & distinct tiles
        List<com.example.trelloclone.domain.Tile> parallelTiles = rawTiles.stream()
                .distinct()
                .filter(tile -> tile.getTile_id() != 0) // exclude null obj
                .collect(Collectors.toList());


        // set cards
        for (Boards rawData : rawDataList) {
            com.example.trelloclone.domain.Card card = new com.example.trelloclone.domain.Card();
            card.setCard_id(rawData.getCard_id());
            card.setCard_name(rawData.getCard_name());
            card.setCard_order(rawData.getCard_order());
            card.setTile_id(rawData.getTile_id());
            rawCards.add(card);
        }

        // to parallel & distinct cards
        List<com.example.trelloclone.domain.Card> parallelCards = rawCards.stream()
                .distinct()
                .filter(card -> card.getCard_id() != 0) // exclude null obj
                .collect(Collectors.toList());


        //set cards to tiles
        for (com.example.trelloclone.domain.Tile tile : parallelTiles) {
            List<com.example.trelloclone.domain.Card> cards = parallelCards.stream()
                    .filter(parallelCard -> parallelCard.getTile_id() == tile.getTile_id())
                    .collect(Collectors.toList());
            tile.setCards(cards);
        }

        // set tiles to boards
        for (com.example.trelloclone.domain.Board board : boards) {
            List<com.example.trelloclone.domain.Tile> tiles = parallelTiles.stream()
                    .filter(parallelTile -> parallelTile.getBoard_id() == board.getBoard_id())
                    .collect(Collectors.toList());
            board.setTiles(tiles);
        }

        return boards;
    }


    //////////////////////
    //// board
    //////////////////////

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


    public void deleteBoard(long board_id) {
        int removedRecords = boardDao.delete(board_id);
        if (removedRecords == 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, String.format("board_id: %d doesn't exist.", board_id));
        }
    }


    //////////////////////
    //// tile
    //////////////////////

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


    //////////////////////
    //// card
    //////////////////////

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
