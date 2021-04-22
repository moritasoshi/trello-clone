package com.example.trelloclone.entity;

import lombok.Data;
import org.seasar.doma.*;

/**
 * マッピング用のEntity
 * (Board List取得時)
 */
@Data
@Entity
@Table(name = "board")
public class Boards {
    private long board_id;
    private String board_name;
    private long user_id;

    private long tile_id;
    private String tile_name;
    private int tile_order;

    private long card_id;
    private String card_name;
    private int card_order;

}
