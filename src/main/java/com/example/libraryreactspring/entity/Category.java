package com.example.libraryreactspring.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "CATEGORY")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "categoryIdPk")
    private Long categoryIdPk;
    @Column(name = "categoryName")
    private String categoryName;

    @OneToMany(mappedBy = "categoryIdFk", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<LibraryItem> libraryItems = new HashSet<>();

    public void addLibraryItem(LibraryItem libraryItem) {
        libraryItems.add(libraryItem);
        libraryItem.setCategoryIdFk(this);
    }

    public void removeLibraryItem(LibraryItem libraryItem) {
        libraryItems.remove(libraryItem);
        libraryItem.setCategoryIdFk(null);
    }
}
