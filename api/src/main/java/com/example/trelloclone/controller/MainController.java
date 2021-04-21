package com.example.trelloclone.controller;

import com.example.trelloclone.entity.User;
import com.example.trelloclone.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    private UserService userService;

    public MainController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/auth/user/sign-up")
    public void createUser(@RequestBody User user){
        userService.createUser(user);
    }
}
