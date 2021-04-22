package com.example.trelloclone.controller;

import com.example.trelloclone.entity.User;
import com.example.trelloclone.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static com.example.trelloclone.security.SecurityConstants.SIGN_UP_URL;

@RestController
public class MainController {

    private UserService userService;

    public MainController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(SIGN_UP_URL)
    public void createUser(@RequestBody User user){
        userService.createUser(user);
    }
}
