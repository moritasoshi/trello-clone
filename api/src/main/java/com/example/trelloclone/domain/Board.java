package com.example.trelloclone.domain;

import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
public class Board {
    private long board_id;
    private String board_name;
    private long user_id;
    private List<Tile> tiles;


    /**
     * board_idを比較してオブジェクトの同値性を判定する
     * <p>
     * stream.distinct()で内部的に使用
     *
     * @param o
     * @return
     */
    @Override
    public boolean equals(Object o) {
        if (o instanceof Board) {
            return this.board_id == ((Board) o).board_id;
        }
        return false;
    }

    /**
     * board_idをもとにハッシュ値を生成
     * <p>
     * stream.distinct()で内部的に使用
     *
     * @return
     */
    @Override
    public int hashCode() {
        return Objects.hash(board_id);
    }
}
