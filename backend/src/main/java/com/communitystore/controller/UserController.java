package com.communitystore.controller;

import com.communitystore.dto.ApiResponse;
import com.communitystore.dto.AuthDtos;
import com.communitystore.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;

    @GetMapping("/pending-verification")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<AuthDtos.UserSummaryDto>>> getPendingVerifications() {
        return ResponseEntity.ok(authService.getPendingVerifications());
    }

    @PutMapping("/{id}/verify")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<AuthDtos.UserSummaryDto>> verifyUser(@PathVariable Long id) {
        return ResponseEntity.ok(authService.verifyUser(id));
    }
}
