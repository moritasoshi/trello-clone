package com.example.trelloclone.entity;

import lombok.Data;
import org.seasar.doma.*;

@Data
@Entity
@Table(name = "board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long board_id;
    private String board_name;
    private long user_id;
}
