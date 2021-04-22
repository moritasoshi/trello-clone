package com.example.trelloclone.domain;

import lombok.Data;

import java.util.List;

@Data
public class Tile {
    private long tile_id;
    private String tile_name;
    private int tile_order;
    private long board_id;
    private List<Card> cards;
}
