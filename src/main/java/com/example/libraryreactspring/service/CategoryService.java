package com.example.libraryreactspring.service;

import com.example.libraryreactspring.entity.Category;
import com.example.libraryreactspring.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final Validator validator;

    @Inject
    public CategoryService(CategoryRepository categoryRepository, Validator validator) {
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
        Set<ConstraintViolation<Category>> violations = validator.validate(category);
        List<Category> categoriesList = getCategories();
        for (Category categoryFromList : categoriesList) {
            if (categoryFromList.getCategoryName().equals(category.getCategoryName())) {
                StringBuilder stringBuilder = new StringBuilder();
                for (ConstraintViolation<Category> constraintViolation : violations) {
                    stringBuilder.append(constraintViolation.getMessage());
                }
                throw new ConstraintViolationException("Category name must be unique, please choose another genre" + stringBuilder, violations);
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
