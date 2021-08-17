import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';

import {categoryController, libraryItemController} from '@/_services';
import {libraryItemService} from "@/libraryItems/LibraryItemService";
import ToggleItemFields from "@/libraryItems/ToggleItemFields";

function LibraryItemsAddEdit({history, match}) {
    const {id} = match.params;
    const isAddMode = !id;

    const [libraryItem, setLibraryItem] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState("");

    const {
        handleTypeChange,
        showFields,
        showTitleField,
        showAuthorField,
        showPageField,
        showCategoryField,
        showRunTimeField,
        customValidationSchema
    } = ToggleItemFields();

    const {register, handleSubmit, reset, setValue, errors, formState} = useForm({
        resolver: yupResolver(customValidationSchema)
    });

    function submit(data) {
        return libraryItemService.onSubmit(id, data, isAddMode, history);
    }

    useEffect(() => {
        if (!isAddMode) {
            showFields();
            libraryItemController.getById(id).then(libraryItems => {
                const fields = ['type', 'categoryName', 'title', 'author', 'pages', 'runTimeInMinutes'];
                fields.forEach(field => setValue(field, libraryItems[field]));
                setLibraryItem(libraryItems);
            });
        }
    }, []);

    const handleCategoryChange = (option) => {
        setSelectedCategory(option.target.value);
    }

    useEffect(() => {
        categoryController.getAll().then(x => setCategories(x));
    }, []);

    return (
        <form onSubmit={handleSubmit(submit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Library Item' : 'Edit Library Item'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Type</label>
                    <select name="type"
                            ref={register}
                            onChange={handleTypeChange}
                            className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                        <option value=""/>
                        <option value="book">Book</option>
                        <option value="dvd">DVD</option>
                        <option value="audioBook">Audio Book</option>
                        <option value="referenceBook">Reference Book</option>
                    </select>
                    <div className="invalid-feedback">{errors.role?.message}</div>
                </div>
                {!showCategoryField ? null : (
                    <div className="form-group col-5">
                        <label>Category</label>
                        <select name="categoryName" ref={register}
                                onChange={handleCategoryChange}
                                className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}>
                            <option value=""/>
                            {categories && categories.map(category =>
                                <option value={category.categoryName}>{category.categoryName}</option>
                            )}
                        </select>
                        <div className="invalid-feedback">{errors.categoryName?.message}</div>
                    </div>
                )}
                {!showTitleField ? null : (
                    <div className="form-group col-5">
                        <label>Title</label>
                        <input name="title" type="text" ref={register}
                               className={`form-control ${errors.title ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.title?.message}</div>
                    </div>
                )}
                {!showAuthorField ? null : (
                    <div className="form-group col-5">
                        <label>Author</label>
                        <input name="author" type="text" ref={register}
                               className={`form-control ${errors.author ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.author?.message}</div>
                    </div>
                )}
                {!showPageField ? null : (
                    <div className="form-group col-5">
                        <label>Pages</label>
                        <input name="pages" type="number" ref={register}
                               className={`form-control ${errors.pages ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.pages?.message}</div>
                    </div>
                )}
                {!showRunTimeField ? null : (
                    <div className="form-group col-5">
                        <label>Run time In Minutes</label>
                        <input name="runTimeInMinutes" type="number" ref={register}
                               className={`form-control ${errors.runTimeInMinutes ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.runTimeInMinutes?.message}</div>
                    </div>
                )}
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"/>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export {LibraryItemsAddEdit}