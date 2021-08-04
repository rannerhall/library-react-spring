import {alertService, employeeController} from "@/_services";


export const employeeService = {
    onSubmit
};

function onSubmit(employeeId, data, isAddMode, history) {
    return isAddMode
        ? createEmployee(data, history)
        : updateEmployee(employeeId, data, history);
}

function createEmployee(data) {
    return employeeController.create(data)
        .then(() => {
            alertService.success('Employee added', {keepAfterRouteChange: true});
            history.push('.');
        })
        .catch(alertService.error);
}

function updateEmployee(id, data) {
    return employeeController.update(id, data)
        .then(() => {
            alertService.success('Employee updated', {keepAfterRouteChange: true});
            history.push('..');
        })
        .catch(alertService.error);
}