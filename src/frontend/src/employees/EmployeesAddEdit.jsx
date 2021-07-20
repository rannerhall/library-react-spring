import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {alertService, employeeService} from '@/_services';

function EmployeesAddEdit({history, match}) {
    const {id} = match.params;
    const isAddMode = !id;

    const [showManagerField, setShowManagerField] = useState(false);

    const validationSchema = Yup.object().shape({
        // title: Yup.string()
        //     .required('Title is required'),
        // firstName: Yup.string()
        //     .required('First Name is required'),
        // lastName: Yup.string()
        //     .required('Last Name is required'),
        // role: Yup.string()
        //     .required('Role is required'),
    });

    const {register, handleSubmit, reset, setValue, errors, formState} = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createEmployee(data)
            : updateEmployee(id, data);
    }

    function createEmployee(data) {
        return employeeService.create(data)
            .then(() => {
                alertService.success('Employee added', {keepAfterRouteChange: true});
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateEmployee(id, data) {
        return employeeService.update(id, data)
            .then(() => {
                alertService.success('Employee updated', {keepAfterRouteChange: true});
                history.push('..');
            })
            .catch(alertService.error);
    }

    const [employee, setEmployee] = useState({});

    useEffect(() => {
        if (!isAddMode) {
            employeeService.getById(id).then(employee => {
                const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
                fields.forEach(field => setValue(field, employee[field]));
                setEmployee(employee);
            });
        }
    }, []);

    const [managers, setManagers] = useState("");

    const [employees, setEmployees] = useState("");

    //console.log(managers);

    useEffect(() => {
        employeeService.getAll().then(x => setEmployees(x));
    }, []);

    const Manager = () => (
        <div className="form-group col-5">
            <label>Manager</label>
            <select
                name="managerId"
                ref={register}
                onChange={(e) => {
                    const selectedEmployee = e.target.value;
                    setManagers(selectedEmployee);
                }}
                className={`form-control ${errors.manager ? 'is-invalid' : ''}`}>
                <option value=""/>
                {employees && employees.map(manager =>
                    <option value={manager.employeeId}>{manager.firstName} {manager.lastName}</option>
                )}
            </select>
            <div className="invalid-feedback">{errors.manager?.message}</div>
        </div>
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
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
                    <input name="rank" type="number" ref={register}
                           className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-3">
                    <label>Role</label>
                    <select name="role" ref={register}
                        className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                        <option value=""/>
                        <option value="employee">Employee</option>
                        <option value="manager">Manger</option>
                        <option value="ceo">CEO</option>
                    </select>
                    <div className="invalid-feedback">{errors.role?.message}</div>
                </div>
            </div>
            {/*{!showManagerField ? null : (*/}
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
                        <option value={manager.employeeId}>{manager.firstName} {manager.lastName}</option>
                    )}
                </select>
                <div className="invalid-feedback">{errors.managerId?.message}</div>
            </div>
            {/*)}*/}
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

export {EmployeesAddEdit};