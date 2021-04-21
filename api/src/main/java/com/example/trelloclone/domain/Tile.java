package com.example.trelloclone.domain;

import lombok.Data;
import org.seasar.doma.*;

import java.util.List;

@Data
@Entity
@Table(name = "tile")
public class Tile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tile_id;
    private String tile_name;
    private int tile_order;
    private long board_id;

}
