package com.example.libraryreactspring.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "LIBRARY_ITEM")
public class LibraryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "libraryItemIdPk")
    private Long libraryItemIdPk;
    @Column(name = "title")
    private String title;
    @Column(name = "author")
    private String author;
    @Column(name = "pages")
    private int pages;
    @Column(name = "runTimeMinutes")
    private int runTimeMinutes;
    @Column(name = "isBorrowable")
    private boolean isBorrowable;
    @Column(name = "borrower")
    private String borrower;
    @Column(name = "borrowDate")
    private LocalDate borrowDate;
    @Column(name = "type")
    private String type;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    private Category categoryIdFk;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LibraryItem that = (LibraryItem) o;
        return pages == that.pages && runTimeMinutes == that.runTimeMinutes && isBorrowable == that.isBorrowable && Objects.equals(libraryItemIdPk, that.libraryItemIdPk) && Objects.equals(title, that.title) && Objects.equals(author, that.author) && Objects.equals(borrower, that.borrower) && Objects.equals(borrowDate, that.borrowDate) && Objects.equals(type, that.type) && Objects.equals(categoryIdFk, that.categoryIdFk);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
