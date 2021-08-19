package com.example.libraryreactspring.controller;

import com.example.libraryreactspring.entity.LibraryItem;
import com.example.libraryreactspring.service.LibraryItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Set;

@RestController
@RequestMapping("api/library/libraryItem")
public class LibraryItemController {

    private final LibraryItemService libraryItemService;
    private static final String LIBRARY_ITEM_ID_PK = "/{libraryItemIdPk}";

    @Inject
    public LibraryItemController(LibraryItemService libraryItemService) {
        this.libraryItemService = libraryItemService;
    }

    @GetMapping()
    public Set<LibraryItem> getLibraryItems() {
        return libraryItemService.getLibraryItems();
    }

    @GetMapping(LIBRARY_ITEM_ID_PK)
    public LibraryItem getLibraryItemById(@PathVariable Long libraryItemIdPk) {
        return libraryItemService.getLibraryItemById(libraryItemIdPk);
    }

    @PostMapping("/{categoryName}")
    public ResponseEntity<LibraryItem> createLibraryItem(@Valid @RequestBody LibraryItem libraryItem, @PathVariable String categoryName) throws URISyntaxException {
        LibraryItem savedLibraryItem = libraryItemService.createLibraryItem(libraryItem, categoryName);
        String url = "/libraryItems/" + savedLibraryItem;
        url = URLEncoder.encode(url, StandardCharsets.UTF_8);
        return ResponseEntity.created(new URI(url)).body(savedLibraryItem);
    }

    @PutMapping(LIBRARY_ITEM_ID_PK + "/{checkOut}/{categoryName}")
    public ResponseEntity<LibraryItem> updateLibraryItem(@PathVariable Long libraryItemIdPk, @PathVariable boolean checkOut, @PathVariable String categoryName, @RequestBody LibraryItem libraryItem) {
        LibraryItem currentLibraryItem = libraryItemService.editLibraryItem(libraryItemIdPk, libraryItem, checkOut, categoryName);
        return ResponseEntity.ok(currentLibraryItem);
    }

    @DeleteMapping(LIBRARY_ITEM_ID_PK)
    public ResponseEntity<LibraryItem> deleteCategory(@PathVariable Long libraryItemIdPk) {
        libraryItemService.deleteCategory(libraryItemIdPk);
        return ResponseEntity.ok().build();
    }
}
