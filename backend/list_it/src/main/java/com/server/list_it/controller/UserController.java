package com.server.list_it.controller;

import com.server.list_it.dto.UserDto;
import com.server.list_it.model.ApiResponse;
import com.server.list_it.model.ChangePasswordRequest;
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
            boolean emailExists = userService.emailExists(user.getEmail());
            if (emailExists) {
                response.setStatus(false);
                response.setMessage("Email już istnieje");
                return ResponseEntity.status(400).body(response);
            }
            User savedUser = userService.createUser(user);
            response.setStatus(true);
            response.setMessage("Użytkownik zarejestrowany pomyślnie");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.setStatus(false);
            response.setMessage("Nie udało się zarejestrować użytkownika: " + e.getMessage());
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
                response.setMessage("Logowanie udane");
                response.setStatus(true);
                response.setUser(user);
                return ResponseEntity.ok(response);
            } else {
                response.setMessage("Nieprawidłowy email lub hasło");
                response.setStatus(false);
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            response.setMessage("Wystąpił błąd: " + e.getMessage());
            response.setStatus(false);
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/api/logout")
    public ResponseEntity<ApiResponse> logoutUser(HttpSession session) {
        session.invalidate();
        ApiResponse response = new ApiResponse();
        response.setMessage("Wylogowanie udane");
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

    @PutMapping("/api/user/change-password")
    public ResponseEntity<ApiResponse> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, HttpSession session) {
        ApiResponse response = new ApiResponse();
        User user = (User) session.getAttribute("user");
        if (user == null) {
            response.setStatus(false);
            response.setMessage("Użytkownik nie jest zalogowany");
            return ResponseEntity.status(401).body(response);
        }

        boolean isChanged = userService.changePassword(user.getId(), changePasswordRequest);
        if (isChanged) {
            response.setStatus(true);
            response.setMessage("Hasło zmienione pomyślnie");
            return ResponseEntity.ok(response);
        } else {
            response.setStatus(false);
            response.setMessage("Nieprawidłowe obecne hasło");
            return ResponseEntity.status(400).body(response);
        }
    }

}
