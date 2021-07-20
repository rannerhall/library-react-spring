import React from 'react';
import {Route, Switch, Redirect, useLocation} from 'react-router-dom';

import {Nav, Alert} from '@/_components';
import {Home} from '@/home';
import {Categories} from "@/categories/CategoriesIndex";
import {LibraryItems} from "@/libraryItems/LibraryItemsIndex";
import {EmployeesIndex} from "@/employees/EmployeesIndex"

function App() {
    const {pathname} = useLocation();

    return (
        <div className="app-container bg-light">
            <Nav/>
            <Alert/>
            <div className="container pt-4 pb-4">
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)}/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/categories" component={Categories}/>
                    <Route path="/libraryItems" component={LibraryItems}/>
                    <Route path="/employees" component={EmployeesIndex}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </div>
        </div>
    );
}

export {App};