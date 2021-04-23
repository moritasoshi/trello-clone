package com.example.trelloclone.dao;

import com.example.trelloclone.entity.Card;
import com.example.trelloclone.entity.Tile;
import org.seasar.doma.Dao;
import org.seasar.doma.Delete;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;
import org.springframework.transaction.annotation.Transactional;


@ConfigAutowireable
@Dao
public interface CardDao {

    @Select
    Card findLatest();

    @Select
    int fetchMaxCardOrderByTileId(long tile_id);

    @Insert
    @Transactional
    int insert(Card card);

    @Delete(sqlFile = true)
    int delete(long card_id);
}
