import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CategoriesList } from './CategoriesList';
import { CategoriesAddEdit } from './CategoriesAddEdit';

function Categories({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={CategoriesList} />
            <Route path={`${path}/add`} component={CategoriesAddEdit} />
            <Route path={`${path}/edit/:id`} component={CategoriesAddEdit} />
        </Switch>
    );
}

export { Categories };