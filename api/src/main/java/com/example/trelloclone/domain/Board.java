package com.example.trelloclone.domain;

import lombok.Data;

import java.util.List;

@Data
public class Board {
    private long board_id;
    private String board_name;
    private long user_id;
    private List<Tile> tiles;
}
