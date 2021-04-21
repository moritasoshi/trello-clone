package com.example.trelloclone.entity;

import lombok.Data;
import org.seasar.doma.*;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;
    private String email;
    private String password;
}