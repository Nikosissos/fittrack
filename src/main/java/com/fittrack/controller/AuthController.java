package com.fittrack.controller;

import com.fittrack.dto.AuthRequest;
import com.fittrack.dto.AuthResponse;
import com.fittrack.dto.UtilisateurRequest;
import com.fittrack.dto.UtilisateurResponse;
import com.fittrack.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UtilisateurResponse> register(@Valid @RequestBody UtilisateurRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}