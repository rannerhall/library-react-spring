import React from "react";

const Borrower = () => (
    <div className="form-group col-5">
        <label>Borrower</label>
        <input name="borrower" type="text" ref={register}
               className={`form-control ${errors.borrower ? 'is-invalid' : ''}`}/>
        <div className="invalid-feedback">{errors.borrower?.message}</div>
    </div>
)