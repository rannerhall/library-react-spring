import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {employeeController} from '@/_services';

function EmployeesList({match}) {
    const {path} = match;
    const [employees, setEmployees] = useState(null);

    useEffect(() => {
        employeeController.getAll().then(x => setEmployees(x));
    }, []);

    function deleteEmployee(employeeId) {
        setEmployees(employees.map(x => {
            if (x.employeeId === employeeId) {
                x.isDeleting = true;
            }
            return x;
        }));
        employeeController.delete(employeeId).then(() => {
            setEmployees(employee => employee.filter(x => x.employeeId !== employeeId));
        });
    }

    return (
        <div>
            <h1>Employees</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Employee</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{width: '30%'}}>First Name</th>
                    <th style={{width: '30%'}}>Last Name</th>
                    <th style={{width: '30%'}}>Salary</th>
                    <th style={{width: '30%'}}>Role</th>
                    <th style={{width: '10%'}}/>
                </tr>
                </thead>
                <tbody>
                {employees && employees.map(employee =>
                    <tr key={employee.employeeId}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.salary}</td>
                        <td>
                            {employee.manager ? "Manager" : null}
                            {employee.ceo ? "CEO" : null}
                            {employee.manager === false && employee.ceo === false ? "Employee" : null}</td>
                        <td style={{whiteSpace: 'nowrap'}}>
                            <Link to={`${path}/edit/${employee.employeeId}`}
                                  className="btn btn-sm btn-primary mr-1">Edit</Link>
                            <button onClick={() => deleteEmployee(employee.employeeId)}
                                    className="btn btn-sm btn-danger btn-delete" disabled={employee.isDeleting}>
                                {employee.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"/>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!employees &&
                <tr>
                    <td colSpan="6" className="text-center">
                        <div className="spinner-border spinner-border-lg align-center"/>
                    </td>
                </tr>
                }
                {employees && !employees.length &&
                <tr>
                    <td colSpan="4" className="text-center">
                        <div className="p-2">No Employee To Display</div>
                    </td>
                </tr>
                }
                </tbody>
            </table>
        </div>
    );
}

export {EmployeesList};