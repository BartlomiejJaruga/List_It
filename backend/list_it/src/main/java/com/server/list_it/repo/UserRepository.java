package com.server.list_it.repo;

import com.server.list_it.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmailAndPassword(String email, String password);
    User findByEmail(String email);
}
