import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { EmployeesList } from './EmployeesList';
import { EmployeesAddEdit } from './EmployeesAddEdit';

function EmployeesIndex({ match }) {
    const { path } = match;

    return (
        <Switch>
            <Route exact path={path} component={EmployeesList} />
            <Route path={`${path}/add`} component={EmployeesAddEdit} />
            <Route path={`${path}/edit/:id`} component={EmployeesAddEdit} />
        </Switch>
    );
}

export { EmployeesIndex };