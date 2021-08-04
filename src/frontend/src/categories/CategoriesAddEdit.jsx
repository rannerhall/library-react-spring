import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {categoryController, alertService} from '@/_services';

function CategoriesAddEdit({history, match}) {
    const {id} = match.params;
    const isAddMode = !id;

    const validationSchema = Yup.object().shape({
        categoryName: Yup.string()
            .required('Category Name is required')
    });

    const {register, handleSubmit, reset, setValue, errors, formState} = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createCategory(data)
            : updateCategory(id, data);
    }

    function createCategory(data) {
        return categoryController.create(data)
            .then(() => {
                alertService.success('Category added', {keepAfterRouteChange: true});
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateCategory(id, data) {
        return categoryController.update(id, data)
            .then(() => {
                alertService.success('Category updated', {keepAfterRouteChange: true});
                history.push('..');
            })
            .catch(alertService.error);
    }

    const [category, setCategory] = useState({});

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
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
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