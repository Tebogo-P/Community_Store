package com.communitystore.controller;

import com.communitystore.dto.ApiResponse;
import com.communitystore.dto.BulletinDto;
import com.communitystore.service.BulletinService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bulletin")
@RequiredArgsConstructor
public class BulletinController {

    private final BulletinService bulletinService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BulletinDto.Response>>> getAllPosts() {
        return ResponseEntity.ok(bulletinService.getAllPosts());
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<BulletinDto.Response>> createPost(
            @Valid @RequestBody BulletinDto.CreateRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(bulletinService.createPost(request, authentication.getName()));
    }
}
