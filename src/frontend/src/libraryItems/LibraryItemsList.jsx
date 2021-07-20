import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {libraryItemService} from '@/_services';

//• Listing library items should be sorted by Category Name. This can be changed to
//  Type by the user. (This change need to persist in current session but not after
//  application restart)
//• Acronym after the title of library items (e.g. “The title (TT)”)

function LibraryItemsList({match}) {
    const {path} = match;
    const [libraryItems, setLibraryItems] = useState(null);
    const [showCheckoutLink, setShowCheckoutLink] = useState(true);
    const [showCheckInLink, setShowCheckInLink] = useState(false)

    useEffect(() => {
        libraryItemService.getAll().then(x =>
            setLibraryItems(x));
    }, []);

    function deleteLibraryItems(libraryItemIdPk) {
        setLibraryItems(libraryItems.map(x => {
            if (x.libraryItemIdPk === libraryItemIdPk) {
                x.isDeleting = true;
            }
            return x;
        }));
        libraryItemService.delete(libraryItemIdPk).then(() => {
            setLibraryItems(libraryItems => libraryItems.filter(x => x.libraryItemIdPk !== libraryItemIdPk));
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
                {libraryItems && libraryItems.map(libraryItems =>
                    <tr key={libraryItems.libraryItemIdPk}>
                        <td>{libraryItems.title}</td>
                        <td>
                            {libraryItems.title.split(/\s/)
                            .reduce(function(accumulator, word) {
                                return accumulator + word.charAt(0);
                            }, '')}</td>
                        <td>{libraryItems.author}</td>
                        <td>{libraryItems.pages}</td>
                        <td>{libraryItems.runTimeInMinutes}</td>
                        <td>{String(libraryItems.borrowable)}</td>
                        <td>{libraryItems.borrower}</td>
                        <td>{libraryItems.borrowDate}</td>
                        <td>{libraryItems.type}</td>

                        <td style={{whiteSpace: 'nowrap'}}>
                            <Link to={`${path}/edit/${libraryItems.libraryItemIdPk}`}
                                  className="btn btn-sm btn-primary mr-1">Edit</Link>
                            {!showCheckoutLink ? null : (
                                <Link to={`${path}/borrow/${libraryItems.libraryItemIdPk}`}
                                      className="btn btn-sm btn-primary mr-1">Check Out</Link>
                            )}
                            {!showCheckInLink ? null : (
                                <Link to={`${path}/borrow/${libraryItems.libraryItemIdPk}`}
                                      className="btn btn-sm btn-primary mr-1">Check In</Link>
                            )}
                            <button onClick={() => deleteLibraryItems(libraryItems.libraryItemIdPk)}
                                    className="btn btn-sm btn-danger btn-delete"
                                    disabled={libraryItems.isDeleting}>
                                {libraryItems.isDeleting
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