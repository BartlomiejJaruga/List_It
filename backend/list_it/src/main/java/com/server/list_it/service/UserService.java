package com.server.list_it.service;

import com.server.list_it.dto.UserDto;
import com.server.list_it.model.ChangePasswordRequest;
import com.server.list_it.model.User;
import com.server.list_it.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean changePassword(Long userId, ChangePasswordRequest changePasswordRequest) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null && user.getPassword().equals(changePasswordRequest.getCurrentPassword())) {
            user.setPassword(changePasswordRequest.getNewPassword());
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean checkLogin(User user) {
        user = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        return user != null;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }

    public User authenticate(String email, String password) {
        System.out.println("Authenticating user with email: " + email);
        User user = userRepository.findByEmailAndPassword(email, password);
        if (user == null) {
            System.out.println("Authentication failed for email: " + email);
        } else {
            System.out.println("Authentication successful for email: " + email);
        }
        return user;
    }

    public User updateUser(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setDescription(userDto.getDescription());
            return userRepository.save(user);
        }
        return null;
    }
}
