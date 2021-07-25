import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {categoryService} from '@/_services';

function CategoriesList({match}) {
    const {path} = match;
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        categoryService.getAll().then(x => setCategories(x));
    }, []);

    function deleteCategory(categoryIdPk) {
        setCategories(categories.map(x => {
            if (x.categoryIdPk === categoryIdPk) {
                x.isDeleting = true;
            }
            return x;
        }));
        categoryService.delete(categoryIdPk).then(() => {
            setCategories(category => category.filter(x => x.categoryIdPk !== categoryIdPk));
        });
    }

    return (
        <div>
            <h1>Categories</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Category</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{width: '30%'}}>Category Name</th>
                    <th style={{width: '10%'}}/>
                </tr>
                </thead>
                <tbody>
                {categories && categories.map(category =>
                    <tr key={category.categoryIdPk}>
                        <td>{category.categoryName} </td>
                        <td style={{whiteSpace: 'nowrap'}}>
                            <Link to={`${path}/edit/${category.categoryIdPk}`}
                                  className="btn btn-sm btn-primary mr-1">Edit</Link>
                            <button onClick={() => deleteCategory(category.categoryIdPk)}
                                    className="btn btn-sm btn-danger btn-delete" disabled={category.isDeleting}>
                                {category.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"/>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!categories &&
                <tr>
                    <td colSpan="4" className="text-center">
                        <div className="spinner-border spinner-border-lg align-center"/>
                    </td>
                </tr>
                }
                {categories && !categories.length &&
                <tr>
                    <td colSpan="4" className="text-center">
                        <div className="p-2">No Category To Display</div>
                    </td>
                </tr>
                }
                </tbody>
            </table>
        </div>
    );
}

export {CategoriesList};