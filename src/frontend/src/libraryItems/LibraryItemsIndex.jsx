import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LibraryItemsList } from './LibraryItemsList';
import { LibraryItemsAddEdit } from './LibraryItemsAddEdit';

function LibraryItems({ match }) {
    const { path } = match;

    return (
        <Switch>
            <Route exact path={path} component={LibraryItemsList} />
            <Route path={`${path}/add`} component={LibraryItemsAddEdit} />
            <Route path={`${path}/edit/:id`} component={LibraryItemsAddEdit} />
        </Switch>
    );
}

export { LibraryItems };