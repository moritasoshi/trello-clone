package com.example.trelloclone.controller;

import com.example.trelloclone.dao.BoardsDao;
import com.example.trelloclone.entity.*;
import com.example.trelloclone.security.SimpleLoginUser;
import com.example.trelloclone.service.TaskService;
import com.example.trelloclone.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

import static com.example.trelloclone.security.SecurityConstants.SIGN_UP_URL;

@RestController
public class MainController {

    private UserService userService;
    private TaskService taskService;

    public MainController(UserService userService, TaskService taskService) {
        this.userService = userService;
        this.taskService = taskService;
    }


    //////////////////////
    //// user
    //////////////////////

    @PostMapping(SIGN_UP_URL)
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }


    //////////////////////
    //// boards
    //////////////////////

    @GetMapping("/boards")
    public ResponseEntity<List<com.example.trelloclone.domain.Board>> fetchBoards() {
        User loginUser = ((SimpleLoginUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        List<com.example.trelloclone.domain.Board> boards = taskService.fetchBoards(loginUser.getUser_id());
        return ResponseEntity.ok(boards);
    }


    //////////////////////
    //// board
    //////////////////////

    @PostMapping("/board")
    public ResponseEntity<Board> createBoard(@RequestBody Board board) {
        // set user_id
        User loginUser = ((SimpleLoginUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        Board newBoard = board;
        newBoard.setUser_id(loginUser.getUser_id());

        Board result = taskService.createBoard(newBoard);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.getBoard_id())
                .toUri();

        return ResponseEntity.created(uri).body(result);
    }


    //////////////////////
    //// tile
    //////////////////////

    @PostMapping("/tile")
    public ResponseEntity<Tile> createTile(@RequestBody Tile tile) {
        Tile result = taskService.createTile(tile);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.getTile_id())
                .toUri();

        return ResponseEntity.created(uri).body(result);
    }


    //////////////////////
    //// card
    //////////////////////

    @PostMapping("/card")
    public ResponseEntity<Card> createCard(@RequestBody Card card) {
        Card result = taskService.createCard(card);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.getCard_id())
                .toUri();

        return ResponseEntity.created(uri).body(result);
    }
}
