package com.example.trelloclone.domain;

import lombok.Data;

import java.util.Objects;

@Data
public class Card {
    private long card_id;
    private String card_name;
    private int card_order;
    private long tile_id;

    /**
     * card_idを比較してオブジェクトの同値性を判定する
     * <p>
     * stream.distinct()で内部的に使用
     *
     * @param o
     * @return
     */
    @Override
    public boolean equals(Object o) {
        if (o instanceof Card) {
            return this.card_id == ((Card) o).card_id;
        }
        return false;
    }

    /**
     * card_idをもとにハッシュ値を生成
     * <p>
     * stream.distinct()で内部的に使用
     *
     * @return
     */
    @Override
    public int hashCode() {
        return Objects.hash(card_id);
    }
}
