package com.example.trelloclone.domain;

import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
public class Tile {
    private long tile_id;
    private String tile_name;
    private int tile_order;
    private long board_id;
    private List<Card> cards;


    /**
     * tile_idを比較してオブジェクトの同値性を判定する
     * <p>
     * stream.distinct()で内部的に使用
     *
     * @param o
     * @return
     */
    @Override
    public boolean equals(Object o) {
        if (o instanceof Tile) {
            return this.tile_id == ((Tile) o).tile_id;
        }
        return false;
    }

    /**
     * tile_idをもとにハッシュ値を生成
     * <p>
     * stream.distinct()で内部的に使用
     *
     * @return
     */
    @Override
    public int hashCode() {
        return Objects.hash(tile_id);
    }
}
