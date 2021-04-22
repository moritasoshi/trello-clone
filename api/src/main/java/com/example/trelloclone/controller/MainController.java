package com.example.trelloclone.controller;

import com.example.trelloclone.entity.Board;
import com.example.trelloclone.entity.User;
import com.example.trelloclone.service.TaskService;
import com.example.trelloclone.service.UserService;
import org.seasar.doma.jdbc.Result;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

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
    //// board
    //////////////////////

    @PostMapping("/board")
    public ResponseEntity<Board> createBoard(@RequestBody Board board) {
        Board result = taskService.createBoard(board);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.getBoard_id())
                .toUri();
        return ResponseEntity.created(uri).body(result);
    }
}
