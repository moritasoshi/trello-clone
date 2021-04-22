package com.example.trelloclone.dao;

import com.example.trelloclone.entity.Tile;
import org.seasar.doma.Dao;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;
import org.springframework.transaction.annotation.Transactional;


@ConfigAutowireable
@Dao
public interface TileDao {

    @Select
    Tile findById(Integer tile_id);

    @Select
    Tile findLatest();

    @Select
    int fetchMaxTileOrderByBoardId(long board_id);

    @Insert
    @Transactional
    int insert(Tile tile);


}
