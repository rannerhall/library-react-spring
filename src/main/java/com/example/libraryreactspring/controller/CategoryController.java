package com.example.libraryreactspring.controller;

import com.example.libraryreactspring.entity.Category;
import com.example.libraryreactspring.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("api/library/")
public class CategoryController {

    private final CategoryService categoryService;
    private static final String CATEGORY = "/category";
    private static final String CATEGORY_ID_PK = "/{categoryIdPk}";

    @Inject
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(CATEGORY)
    public Iterable<Category> getCategories() {
        return categoryService.getCategories();
    }

    @GetMapping(CATEGORY + CATEGORY_ID_PK)
    public Category getCategoryById(@PathVariable Long categoryIdPk) {
        return categoryService.getCategoryById(categoryIdPk);
    }

    @PostMapping(CATEGORY)
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) throws URISyntaxException {
        Category savedCategory = categoryService.createCategory(category);
        return ResponseEntity.created(new URI("/categories/" + savedCategory.getCategoryIdPk())).body(savedCategory);
    }

    @PutMapping(CATEGORY + CATEGORY_ID_PK)
    public ResponseEntity<Category> updateCategory(@PathVariable Long categoryIdPk, @RequestBody Category category) {
        Category currentCategory = categoryService.editCategory(categoryIdPk, category);
        return ResponseEntity.ok(currentCategory);
    }

    @DeleteMapping(CATEGORY + CATEGORY_ID_PK)
    public ResponseEntity<Category> deleteCategory(@PathVariable Long categoryIdPk) {
        categoryService.deleteCategory(categoryIdPk);
        return ResponseEntity.ok().build();
    }
}
