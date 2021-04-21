//package com.example.trelloclone.service;
//
//import com.example.trelloclone.domain.ApplicationUser;
////import com.example.trelloclone.mapper.ApplicationUserMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.Collections;
//
//@Service
//public class UserDetailsServiceImpl implements UserDetailsService {
//
////    @Autowired
////    private ApplicationUserMapper applicationUserMapper;
//
//    @Override
//    public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
//        ApplicationUser applicationUser = applicationUserMapper.findByUid(uid);
//
//        if (applicationUser == null) {
//            throw new UsernameNotFoundException(uid);
//        }
//        return new User(applicationUser.getUid(), applicationUser.getPassword(), Collections.emptyList());
//    }
//}