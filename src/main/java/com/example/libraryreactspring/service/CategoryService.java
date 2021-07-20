package com.example.libraryreactspring.service;

import com.example.libraryreactspring.entity.Category;
import com.example.libraryreactspring.repository.CategoryRepository;
import com.example.libraryreactspring.validator.ValidatorMessage;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ValidatorMessage validator;

    @Inject
    public CategoryService(CategoryRepository categoryRepository, ValidatorMessage validator) {
        this.categoryRepository = categoryRepository;
        this.validator = validator;
    }


    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long categoryIdPk) {
        return categoryRepository.findById(categoryIdPk).orElseThrow(RuntimeException::new);
    }

    public Category createCategory(Category category) {
        checkIfNameExists(category);
        categoryRepository.save(category);
        return category;
    }

    private void checkIfNameExists(Category category) {
        List<Category> categoriesList = getCategories();
        for (Category categoryFromList : categoriesList) {
            if (categoryFromList.getCategoryName().equals(category.getCategoryName())) {
                validator.validate("Category name must be unique, please choose another genre", category);
            }
        }
    }

    public Category editCategory(Long categoryIdPk, Category category) {
        Category categoryToUpdate = getCategoryById(categoryIdPk);
        checkIfNameExists(category);
        categoryToUpdate.setCategoryName(category.getCategoryName());
        categoryToUpdate = categoryRepository.save(category);
        return categoryToUpdate;
    }

    public void deleteCategory(Long categoryId) {
        Category categoryIdToDelete = getCategoryById(categoryId);
        if (categoryIdToDelete != null) {
            categoryRepository.deleteById(categoryId);
        }
    }
}
