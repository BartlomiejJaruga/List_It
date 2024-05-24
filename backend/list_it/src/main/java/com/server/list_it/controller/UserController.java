package com.server.list_it.controller;



import com.server.list_it.model.ApiResponse;
import com.server.list_it.model.User;
import com.server.list_it.service.UserService;
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
        res.setMessage("welcome to api");
        res.setStatus(true);
        return res;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        return ResponseEntity.ok(savedUser);
    }


    @PostMapping("/login")
    public ResponseEntity<ApiResponse> loginUser(@RequestBody User loginRequest) {
        User user = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        if (user != null) {
            ApiResponse response = new ApiResponse();
            response.setMessage("Login successful");
            response.setStatus(true);
            return ResponseEntity.ok(response);
        } else {
            ApiResponse response = new ApiResponse();
            response.setMessage("Invalid email or password");
            response.setStatus(false);
            return ResponseEntity.status(401).body(response);
        }
    }
}
