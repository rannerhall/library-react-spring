package com.example.libraryreactspring.service;

import com.example.libraryreactspring.entity.Category;
import com.example.libraryreactspring.entity.LibraryItem;
import com.example.libraryreactspring.repository.CategoryRepository;
import com.example.libraryreactspring.repository.LibraryItemRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class LibraryItemService {

    private final LibraryItemRepository libraryItemRepository;
    private final CategoryRepository categoryRepository;

    private static final String REFERENCE_BOOK = "referenceBook";

    @Inject
    public LibraryItemService(LibraryItemRepository libraryItemRepository, CategoryRepository categoryRepository) {
        this.libraryItemRepository = libraryItemRepository;
        this.categoryRepository = categoryRepository;
    }

    public Set<LibraryItem> getLibraryItems() {
        Optional<Category> category = categoryRepository.findById(1L);
        return category.map(Category::getLibraryItems).orElse(null);
    }

    public LibraryItem getLibraryItemById(Long libraryItemIdPk) {
        return libraryItemRepository.findById(libraryItemIdPk).orElseThrow(RuntimeException::new);
    }

    private List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    private void saveLibraryItem(LibraryItem libraryItem) {
        libraryItemRepository.save(libraryItem);
    }

    public LibraryItem createLibraryItem(@Valid LibraryItem libraryItem, String categoryName) {
        for (Category category : getAllCategories()) {
            if (categoryName.equals(category.getCategoryName())) {
                libraryItem.setBorrowable(!libraryItem.getType().equals(REFERENCE_BOOK));
                saveLibraryItem(libraryItem);
                category.addLibraryItem(libraryItem);
                categoryRepository.save(category);
            }
        }
        return libraryItem;
    }

    //@Todo edit
    public LibraryItem editLibraryItem(Long libraryItemIdPk, LibraryItem libraryItem) {
        LibraryItem libraryItemToUpdate = getLibraryItemById(libraryItemIdPk);
        if (libraryItemToUpdate.isBorrowable()) {
            libraryItemToUpdate.setBorrower(libraryItem.getBorrower());
            libraryItemToUpdate.setBorrowable(false);
            libraryItemToUpdate.setBorrowDate(LocalDate.now());
            saveLibraryItem(libraryItemToUpdate);
            return libraryItemToUpdate;
        } else if (!libraryItemToUpdate.isBorrowable()) {
            libraryItemToUpdate.setBorrower(null);
            libraryItemToUpdate.setBorrowable(true);
            libraryItemToUpdate.setBorrowDate(null);
            saveLibraryItem(libraryItemToUpdate);
            return libraryItemToUpdate;
        }
        return libraryItemToUpdate;
    }

    public void deleteCategory(Long libraryItemIdPk) {
        LibraryItem libraryItemToDelete = getLibraryItemById(libraryItemIdPk);
        if (libraryItemToDelete != null) {
            Category categoryIdFk = libraryItemToDelete.getCategoryIdFk();
            categoryIdFk.removeLibraryItem(libraryItemToDelete);
            libraryItemRepository.deleteById(libraryItemIdPk);
        }
    }
}
