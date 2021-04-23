package com.example.trelloclone.dao;

import com.example.trelloclone.entity.Board;
import org.seasar.doma.Dao;
import org.seasar.doma.Delete;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;
import org.springframework.transaction.annotation.Transactional;


@ConfigAutowireable
@Dao
public interface BoardDao {

    @Select
    Board findByBoardId(long board_id);

    @Select
    Board findLatest();

    @Insert
    @Transactional
    int insert(Board board);

    @Delete(sqlFile = true)
    int delete(long board_id);


}
