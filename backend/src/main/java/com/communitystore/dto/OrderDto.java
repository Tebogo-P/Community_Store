package com.communitystore.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

public class OrderDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ItemRequest {
        private Long productId;
        private Integer quantity;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequest {
        @NotEmpty(message = "Order must contain at least one item")
        private List<ItemRequest> items;

        private String paymentMethod;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ItemResponse {
        private Long id;
        private ProductDto.Response product;
        private Integer quantity;
        private BigDecimal price;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private Long id;
        private AuthDtos.UserSummaryDto buyer;
        private BigDecimal totalAmount;
        private String status;
        private String paymentMethod;
        private List<ItemResponse> items;
        private String createdAt;
    }
}
