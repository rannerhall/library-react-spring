package com.example.libraryreactspring.repository;

import com.example.libraryreactspring.entity.LibraryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibraryItemRepository extends JpaRepository<LibraryItem, Long> {
}
