package com.communitystore.service;

import com.communitystore.dto.ApiResponse;
import com.communitystore.dto.AuthDtos;
import com.communitystore.model.User;
import com.communitystore.repository.UserRepository;
import com.communitystore.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public ApiResponse<AuthDtos.JwtResponse> login(AuthDtos.LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        AuthDtos.JwtResponse response = AuthDtos.JwtResponse.builder()
                .token(jwt)
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .verified(user.isVerified())
                .rating(user.getRating())
                .build();

        return ApiResponse.success("Login successful", response);
    }

    public ApiResponse<AuthDtos.UserSummaryDto> register(AuthDtos.RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ApiResponse.error("Email is already registered");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(request.getRole())
                .institutionOrBusiness(request.getInstitutionOrBusiness())
                .rating(5.0)
                .totalRatings(0)
                .build();

        User savedUser = userRepository.save(user);

        return ApiResponse.success("User registered successfully", mapToSummary(savedUser));
    }

    public ApiResponse<List<AuthDtos.UserSummaryDto>> getPendingVerifications() {
        List<User> users = userRepository.findByVerifiedFalse();
        List<AuthDtos.UserSummaryDto> dtos = users.stream().map(this::mapToSummary).collect(Collectors.toList());
        return ApiResponse.success("Pending verifications retrieved", dtos);
    }

    public ApiResponse<AuthDtos.UserSummaryDto> verifyUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setVerified(true);
        userRepository.save(user);
        return ApiResponse.success("User verified successfully", mapToSummary(user));
    }

    public AuthDtos.UserSummaryDto mapToSummary(User user) {
        return AuthDtos.UserSummaryDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .institutionOrBusiness(user.getInstitutionOrBusiness())
                .verified(user.isVerified())
                .rating(user.getRating())
                .totalRatings(user.getTotalRatings())
                .build();
    }
}
