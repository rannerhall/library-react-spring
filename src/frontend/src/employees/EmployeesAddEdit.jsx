import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {employeeController} from '@/_services';
import {employeeService} from "@/employees/EmployeeService";

function EmployeesAddEdit({history, match}) {
    const {id} = match.params;
    const isAddMode = !id;

    const [showManagerField, setShowManagerField] = useState(false);
    const [role, setRole] = useState(null);
    const [managers, setManagers] = useState("");
    const [employee, setEmployee] = useState({});
    const [employees, setEmployees] = useState("");

    const handleRoleChange = (option) => {
        setRole(option.target.value);
        if (option.target.value === "ceo") {
            setShowManagerField(false);
        } else {
            setShowManagerField(true);
        }
    }

    const validationSchema = Yup.object().shape({
        // title: Yup.string()
        //     .required('Title is required'),
        // firstName: Yup.string()
        //     .required('First Name is required'),
        // lastName: Yup.string()
        //     .required('Last Name is required'),
        // salary: Yup.number()
        //     .required('Salary is required'),
        // role: Yup.string()
        //     .required('Role is required'),
    });

    const {register, handleSubmit, reset, setValue, errors, formState} = useForm({
        resolver: yupResolver(validationSchema)
    });

    function submit(data) {
        employeeService.onSubmit(id, data, isAddMode, history);
    }

    useEffect(() => {
        if (!isAddMode) {
            employeeController.getById(id).then(employee => {
                const fields = ['title', 'firstName', 'lastName', 'salary'];
                fields.forEach(field => setValue(field, employee[field]));
                setEmployee(employee);
            });
        }
    }, []);

    useEffect(() => {
        employeeController.getAll().then(x => setEmployees(x));
    }, []);

    return (
        <form onSubmit={handleSubmit(submit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Employee' : 'Edit Employee'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>First Name</label>
                    <input name="firstName" type="text" ref={register}
                           className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Last Name</label>
                    <input name="lastName" type="text" ref={register}
                           className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Salary</label>
                    <input name="salary" type="number" ref={register}
                           className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Rank</label>
                    <input name="rank" type="number" max={10} ref={register}
                           className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-3">
                    <label>Role</label>
                    <select name="role" ref={register}
                            onChange={handleRoleChange}
                            className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                        <option value=""/>
                        <option value="employee">Employee</option>
                        <option value="manager">Manger</option>
                        <option value="ceo">CEO</option>
                    </select>
                    <div className="invalid-feedback">{errors.role?.message}</div>
                </div>
            </div>
            {!showManagerField ? null : (
                <div className="form-row">
                    <div className="form-group col-5">
                        <label>Manager</label>
                        <select
                            name="managerId"
                            ref={register}
                            onChange={(e) => {
                                const selectedEmployee = e.target.value;
                                setManagers(selectedEmployee);
                            }}
                            className={`form-control ${errors.managerId ? 'is-invalid' : ''}`}>
                            <option value=""/>
                            {employees && employees.map(manager =>
                                <option value={manager.employeeId}>
                                    {manager.manager ? "(Manager)" : null}
                                    {manager.ceo ? "(CEO)" : null}
                                    {manager.firstName} {manager.lastName}</option>
                            )}
                        </select>
                        <div className="invalid-feedback">{errors.managerId?.message}</div>
                    </div>
                </div>
            )}
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"/>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export
{
    EmployeesAddEdit
}
;