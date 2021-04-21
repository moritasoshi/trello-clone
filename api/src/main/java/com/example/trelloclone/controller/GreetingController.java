package com.example.trelloclone.controller;

import com.example.trelloclone.dao.ApplicationUserDao;
import com.example.trelloclone.domain.ApplicationUser;
import com.example.trelloclone.domain.Greeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @Autowired
    ApplicationUserDao applicationUserDao;

//    @GetMapping("/greeting")
//    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
//        return new Greeting(counter.incrementAndGet(), String.format(template, name));
//    }

    @GetMapping("/users")
    public ApplicationUser fetchUser() {
        return applicationUserDao.findByEmail("hello");
    }
}
