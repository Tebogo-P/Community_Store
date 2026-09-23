package com.communitystore.service;

import com.communitystore.dto.ApiResponse;
import com.communitystore.dto.AuthDtos;
import com.communitystore.dto.BulletinDto;
import com.communitystore.model.BulletinPost;
import com.communitystore.model.User;
import com.communitystore.repository.BulletinRepository;
import com.communitystore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BulletinService {

    private final BulletinRepository bulletinRepository;
    private final UserRepository userRepository;
    private final AuthService authService;

    public ApiResponse<List<BulletinDto.Response>> getAllPosts() {
        List<BulletinPost> posts = bulletinRepository.findAllByOrderByCreatedAtDesc();
        List<BulletinDto.Response> dtos = posts.stream().map(this::mapToResponse).collect(Collectors.toList());
        return ApiResponse.success("Bulletin posts retrieved", dtos);
    }

    public ApiResponse<BulletinDto.Response> createPost(BulletinDto.CreateRequest request, String userEmail) {
        User author = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Author user not found"));

        BulletinPost post = BulletinPost.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .postType(request.getPostType() != null ? request.getPostType() : "ANNOUNCEMENT")
                .tags(request.getTags())
                .eventDate(request.getEventDate() != null && !request.getEventDate().isEmpty() 
                        ? LocalDateTime.parse(request.getEventDate()) : null)
                .author(author)
                .build();

        BulletinPost savedPost = bulletinRepository.save(post);
        return ApiResponse.success("Bulletin post published successfully", mapToResponse(savedPost));
    }

    public BulletinDto.Response mapToResponse(BulletinPost post) {
        AuthDtos.UserSummaryDto authorDto = authService.mapToSummary(post.getAuthor());
        return BulletinDto.Response.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .postType(post.getPostType())
                .tags(post.getTags())
                .author(authorDto)
                .eventDate(post.getEventDate() != null ? post.getEventDate().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null)
                .createdAt(post.getCreatedAt() != null ? post.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : "")
                .build();
    }
}
