package com.example.libraryreactspring.service;

import com.example.libraryreactspring.entity.Category;
import com.example.libraryreactspring.entity.LibraryItem;
import com.example.libraryreactspring.repository.CategoryRepository;
import com.example.libraryreactspring.repository.LibraryItemRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class LibraryItemService {

    private final LibraryItemRepository libraryItemRepository;
    private final CategoryRepository categoryRepository;

    private static final String BOOK = "book";
    private static final String DVD = "dvd";
    private static final String AUDIO_BOOK = "audioBook";
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

    public LibraryItem createLibraryItem(@Valid LibraryItem libraryItem, String categoryName) {
        for (Category category : getAllCategories()) {
            if (categoryName.equals(category.getCategoryName())) {
                libraryItemRepository.save(libraryItem);
                category.addLibraryItem(libraryItem);
                categoryRepository.save(category);
            }
        }
        return libraryItem;
    }

    public LibraryItem editLibraryItem(Long libraryItemIdPk, LibraryItem libraryItem) {
        LibraryItem libraryItemToUpdate = getLibraryItemById(libraryItemIdPk);
        libraryItemToUpdate.setAuthor(libraryItem.getAuthor());
        libraryItemToUpdate.setBorrowable(libraryItem.isBorrowable());
        libraryItemToUpdate.setBorrowDate(libraryItem.getBorrowDate());
        libraryItemToUpdate.setBorrower(libraryItem.getBorrower());
        libraryItemToUpdate.setPages(libraryItem.getPages());
        libraryItemToUpdate.setTitle(libraryItem.getTitle());
        libraryItemToUpdate.setType(libraryItem.getType());
        libraryItemToUpdate = libraryItemRepository.save(libraryItem);
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
