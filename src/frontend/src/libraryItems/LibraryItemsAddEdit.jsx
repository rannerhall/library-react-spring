import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Select from 'react-select';

import {alertService, categoryService, libraryItemService} from '@/_services';

function LibraryItemsAddEdit({history, match}) {
    const {id} = match.params;
    const isAddMode = !id;

    const [customValidationSchema, setCustomValidationSchema] = useState();

    const [setLibraryItem] = useState({});
    const [setSelectedCategory] = useState("");
    const [categories, setCategories] = useState("");
    const [selectedOption, setSelectedOption] = useState(selectedOption);

    const [showCategoryField, setShowCategoryField] = useState(false);
    const [showTitleField, setShowTitleField] = useState(false);
    const [showAuthorField, setShowAuthorField] = useState(false);
    const [showPageField, setShowPageField] = useState(false);
    const [showRunTimeField, setShowRunTimeField] = useState(false);

    const bookValidationSchema = Yup.object().shape({
        pages: Yup.number().required('Pages is required'),
    });

    const dvdValidationSchema = Yup.object().shape({
        runTimeInMinutes: Yup.number().required('Run Time is required'),
    });

    const validationSchema = Yup.object().shape({
        type: Yup.string().required('Type is required'),
        categoryName: Yup.string().required('Category is required'),
        title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required'),
    })

    const {register, handleSubmit, reset, setValue, errors, formState} = useForm({
        resolver: yupResolver(validationSchema, customValidationSchema)
    });

    const handleChange = option => {
        setSelectedOption(option.value);
        setValue("type", option.value);

        setShowCategoryField(true);
        setShowTitleField(true);
        setShowAuthorField(true);

        if (option.value === "book" || option.value === "referenceBook") {
            setCustomValidationSchema(bookValidationSchema);
            setShowPageField(true);
            setShowRunTimeField(false);
        }
        if (option.value === "dvd" || option.value === "audioBook") {
            setCustomValidationSchema(dvdValidationSchema);
            setShowPageField(false);
            setShowRunTimeField(true);
        }
    }

    const selectList = [
        {
            label: "Book",
            value: "book"
        },
        {
            label: "DVD",
            value: "dvd"
        },
        {
            label: "Audio Book",
            value: "audioBook"
        },
        {
            label: "Reference Book",
            value: "referenceBook"
        }
    ];

    function onSubmit(data) {
        return isAddMode ?
            createLibraryItem(data) :
            updateLibraryItem(id, data);
    }

    function createLibraryItem(data) {
        return libraryItemService.create(data)
            .then(() => {
                alertService.success('Library item added', {keepAfterRouteChange: true});
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateLibraryItem(id, data) {
        return libraryItemService.update(id, data)
            .then(() => {
                alertService.success('Library item updated', {keepAfterRouteChange: true});
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            libraryItemService.getById(id).then(libraryItem => {
                const fields = ['type', 'categoryName', 'title', 'author', 'pages', 'runTimeInMinutes', 'borrower'];
                fields.forEach(field => setValue(field, libraryItem[field]));
                setLibraryItem(libraryItem);
            });
        }
    }, []);

    useEffect(() => {
        categoryService.getAll().then(x => setCategories(x));
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Library Item' : 'Edit Library Item'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Type</label>
                    <Select {...register("type")} defaultValue={selectedOption}
                            options={selectList}
                            onChange={handleChange}
                            className={`${errors.type ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.type?.message}</div>
                </div>
                {!showCategoryField ? null : (
                    <div className="form-group col-5">
                        <label>Category</label>
                        <select name="categoryName" ref={register}
                                onChange={(e) => {
                                    const category = e.target.value;
                                    setSelectedCategory(category)
                                }}
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

export {LibraryItemsAddEdit};