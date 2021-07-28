import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {libraryItemController} from '@/_services';

//• Listing library items should be sorted by Category Name. This can be changed to
//  Type by the user. (This change need to persist in current session but not after
//  application restart)

function LibraryItemsList({match}) {
    const {path} = match;
    const [libraryItems, setLibraryItems] = useState(null);

    useEffect(() => {
        libraryItemController.getAll().then(x =>
            setLibraryItems(x));
    }, []);

    function deleteLibraryItems(libraryItemIdPk) {
        setLibraryItems(libraryItems.map(x => {
            if (x.libraryItemIdPk === libraryItemIdPk) {
                x.isDeleting = true;
            }
            return x;
        }));
        libraryItemController.delete(libraryItemIdPk).then(() => {
            setLibraryItems(libraryItem => libraryItem.filter(x => x.libraryItemIdPk !== libraryItemIdPk));
        });
    }

    return (
        <div>
            <h1>Library Items</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Library Item</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{width: '15%'}}>Title</th>
                    <th style={{width: '15%'}}>Acronym Title</th>
                    <th style={{width: '15%'}}>Author</th>
                    <th style={{width: '15%'}}>Pages</th>
                    <th style={{width: '15%'}}>Run time</th>
                    <th style={{width: '15%'}}>Is borrowable</th>
                    <th style={{width: '15%'}}>Borrower</th>
                    <th style={{width: '15%'}}>Borrow Date</th>
                    <th style={{width: '15%'}}>type</th>
                    <th style={{width: '10%'}}/>
                </tr>
                </thead>
                <tbody>
                {libraryItems && libraryItems.map(libraryItem =>
                    <tr key={libraryItem.libraryItemIdPk}>
                        <td>{libraryItem.title}</td>
                        <td>{libraryItem.title.split(/\s/)
                            .reduce(function (accumulator, word) {
                                return accumulator + word.charAt(0);
                            }, '')}</td>
                        <td>{libraryItem.author}</td>
                        <td>{libraryItem.pages}</td>
                        <td>{libraryItem.runTimeInMinutes}</td>
                        <td>{libraryItem.borrowable ?
                            <Link
                                to={`${path}/checkOut/${libraryItem.libraryItemIdPk}`}
                                className="btn btn-sm btn-primary mr-1">Check Out</Link>
                            :
                            <Link
                                to={`${path}/checkIn/${libraryItem.libraryItemIdPk}`}
                                className="btn btn-sm btn-primary mr-1">Check In</Link>}
                        </td>
                        <td>{libraryItem.borrower}</td>
                        <td>{libraryItem.borrowDate}</td>
                        <td>{libraryItem.type}</td>

                        <td style={{whiteSpace: 'nowrap'}}>
                            <Link to={`${path}/edit/${libraryItem.libraryItemIdPk}`}
                                  className="btn btn-sm btn-primary mr-1">Edit</Link>
                            <button onClick={() => deleteLibraryItems(libraryItem.libraryItemIdPk)}
                                    className="btn btn-sm btn-danger btn-delete"
                                    disabled={libraryItem.isDeleting}>
                                {libraryItem.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"/>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!libraryItems &&
                <tr>
                    <td colSpan="8" className="text-center">
                        <div className="spinner-border spinner-border-lg align-center"/>
                    </td>
                </tr>
                }
                {libraryItems && !libraryItems.length &&
                <tr>
                    <td colSpan="8" className="text-center">
                        <div className="p-2">No Library Items To Display</div>
                    </td>
                </tr>
                }
                </tbody>
            </table>
        </div>
    );
}

export {LibraryItemsList};