package com.example.trelloclone.domain;

import lombok.Data;

@Data
public class Card {
    private long card_id;
    private String card_name;
    private int card_order;
    private long tile_id;
}
