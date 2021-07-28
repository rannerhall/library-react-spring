import React from "react";
import {alertService, libraryItemController} from "@/_services";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

function CheckOut({history, match}) {
    const {id} = match.params;

    const {register, handleSubmit, reset, errors, formState} = useForm({});

    function onSubmit(data) {
        return checkOutLibraryItem(id, data);
    }

    function checkOutLibraryItem(id, data) {
        return libraryItemController.update(id, data)
            .then(() => {
                alertService.success('Checkout complete', {keepAfterRouteChange: true});
                history.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Borrower</label>
                    <input name="borrower" type="text" ref={register}
                           className={`form-control ${errors.borrower ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.borrower?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"/>}
                    Check Out
                </button>
                <Link to={"/libraryItems"} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    )
}

export default CheckOut
