import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Library</h1>
            <p><Link to="categories">&gt;&gt; Manage Categories</Link></p>
        </div>
    );
}

export { Home };