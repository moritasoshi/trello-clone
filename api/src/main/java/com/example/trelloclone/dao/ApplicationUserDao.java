package com.example.trelloclone.dao;

import com.example.trelloclone.domain.ApplicationUser;
import org.seasar.doma.Dao;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@ConfigAutowireable
@Dao
public interface ApplicationUserDao {
    @Select
    List<ApplicationUser> selectAll();

    @Select
    ApplicationUser findByEmail(String email);

    @Insert
    @Transactional
    int insert(ApplicationUser applicationUser);
}
