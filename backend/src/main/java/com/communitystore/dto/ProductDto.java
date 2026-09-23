package com.communitystore.dto;

import com.communitystore.model.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

public class ProductDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequest {
        @NotBlank(message = "Title is required")
        private String title;

        private String description;

        @NotNull(message = "Price is required")
        @Positive(message = "Price must be positive")
        private BigDecimal price;

        @NotNull(message = "Category is required")
        private Category category;

        private String conditionName;

        private boolean ecoFriendly;

        private String imageUrl;

        private String location;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private Long id;
        private String title;
        private String description;
        private BigDecimal price;
        private Category category;
        private String conditionName;
        private boolean ecoFriendly;
        private boolean available;
        private String imageUrl;
        private String location;
        private AuthDtos.UserSummaryDto seller;
        private String createdAt;
    }
}
