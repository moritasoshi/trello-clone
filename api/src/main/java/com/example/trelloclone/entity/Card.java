package com.example.trelloclone.entity;

import lombok.Data;
import org.seasar.doma.*;

/**
 * マッピング用のEntity
 */
@Data
@Entity
@Table(name = "card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long card_id;
    private String card_name;
    private int card_order;
    private long tile_id;

}
