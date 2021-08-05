import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {categoryController} from '@/_services';
import {categoryService} from "@/categories/CategoryService";

function CategoriesAddEdit({history, match}) {
    const {id} = match.params;
    const isAddMode = !id;

    const [category, setCategory] = useState({});

    const validationSchema = Yup.object().shape({
        categoryName: Yup.string()
            .required('Category Name is required')
    });

    const {register, handleSubmit, reset, setValue, errors, formState} = useForm({
        resolver: yupResolver(validationSchema)
    });

    function submit(data) {
        categoryService.onSubmit(id, data, isAddMode, history)
    }

    useEffect(() => {
        if (!isAddMode) {
            categoryController.getById(id).then(category => {
                const fields = ['categoryName'];
                fields.forEach(field => setValue(field, category[field]));
                setCategory(category);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(submit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Category' : 'Edit Category'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Category Name</label>
                    <input name="categoryName" type="text" ref={register}
                           className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.categoryName?.message}</div>
                </div>
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

export {CategoriesAddEdit};