import {alertService, categoryController} from "@/_services";


export const categoryService = {
    onSubmit
};

function onSubmit(employeeId, data, isAddMode, history) {
    return isAddMode
        ? createEmployee(data, history)
        : updateEmployee(employeeId, data, history);
}

function createEmployee(data, history) {
    return categoryController.create(data)
        .then(() => {
            alertService.success('Category added', {keepAfterRouteChange: true});
            history.push('.');
        })
        .catch(alertService.error);
}

function updateEmployee(id, data, history) {
    return categoryController.update(id, data)
        .then(() => {
            alertService.success('Category updated', {keepAfterRouteChange: true});
            history.push('..');
        })
        .catch(alertService.error);
}