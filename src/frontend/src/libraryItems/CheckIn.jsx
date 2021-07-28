import React from "react";
import {alertService, libraryItemController} from "@/_services";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

function CheckIn({history, match}) {
    const {id} = match.params;

    const {handleSubmit, reset, formState} = useForm({});

    function onSubmit(data) {
        return checkInLibraryItem(id, data);
    }

    function checkInLibraryItem(id, data) {
        return libraryItemController.update(id, data)
            .then(() => {
                alertService.success('Check in complete', {keepAfterRouteChange: true});
                history.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>Check In</h1>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"/>}
                    Check in item
                </button>
                <Link to={"/libraryItems"} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    )
}

export default CheckIn
