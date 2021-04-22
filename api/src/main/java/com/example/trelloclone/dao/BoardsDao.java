package com.example.trelloclone.dao;

import com.example.trelloclone.entity.Boards;
import org.seasar.doma.Dao;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;


@ConfigAutowireable
@Dao
public interface BoardsDao {

    @Select
    List<Boards> findAllBoardsByUserId(long user_id);

}
