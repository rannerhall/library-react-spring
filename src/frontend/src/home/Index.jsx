import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Library</h1>
            <p><Link to="categories">&gt;&gt; Categories</Link></p>
            <p><Link to="categories">&gt;&gt; Library Items</Link></p>
            <p><Link to="categories">&gt;&gt; Employees</Link></p>
        </div>
    );
}

export { Home };