package com.example.trelloclone.dao;

import com.example.trelloclone.domain.User;
import org.seasar.doma.Dao;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;
import org.springframework.transaction.annotation.Transactional;


@ConfigAutowireable
@Dao
public interface UserDao {

    @Select
    User findByEmail(String email);

    @Insert
    @Transactional
    int insert(User user);
}
