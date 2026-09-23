package com.communitystore.repository;

import com.communitystore.model.Category;
import com.communitystore.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByIsAvailableTrueOrderByCreatedAtDesc();

    List<Product> findByCategoryAndIsAvailableTrue(Category category);

    List<Product> findBySellerId(Long sellerId);

    List<Product> findByIsEcoFriendlyTrueAndIsAvailableTrue();

    @Query("SELECT p FROM Product p WHERE p.isAvailable = true AND " +
           "(LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Product> searchProducts(@Param("query") String query);
}
