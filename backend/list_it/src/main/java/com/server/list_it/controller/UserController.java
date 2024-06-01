package com.server.list_it.controller;

import com.server.list_it.dto.UserDto;
import com.server.list_it.model.ApiResponse;
import com.server.list_it.model.User;
import com.server.list_it.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api")
    public ApiResponse homeController(){
        ApiResponse res = new ApiResponse();
        res.setMessage("Welcome to API");
        res.setStatus(true);
        return res;
    }

    @PostMapping("/api/register")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody User user) {
        ApiResponse response = new ApiResponse();
        try {
            User savedUser = userService.createUser(user);
            response.setStatus(true);
            response.setMessage("User registered successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.setStatus(false);
            response.setMessage("Failed to register user: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/api/login")
    public ResponseEntity<ApiResponse> loginUser(@RequestBody User loginRequest, HttpSession session) {
        ApiResponse response = new ApiResponse();
        try {
            User user = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            if (user != null) {
                session.setAttribute("user", user);
                response.setMessage("Login successful");
                response.setStatus(true);
                response.setUser(user);
                return ResponseEntity.ok(response);
            } else {
                response.setMessage("Invalid email or password");
                response.setStatus(false);
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            response.setMessage("An error occurred: " + e.getMessage());
            response.setStatus(false);
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/api/logout")
    public ResponseEntity<ApiResponse> logoutUser(HttpSession session) {
        session.invalidate();
        ApiResponse response = new ApiResponse();
        response.setMessage("Logout successful");
        response.setStatus(true);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/user")
    public ResponseEntity<User> getUserDetails(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PutMapping("/api/user/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody UserDto userDto) {
        User updatedUser = userService.updateUser(userId, userDto);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
