import {alertService, libraryItemController} from "@/_services";

export const libraryItemService = {
    onSubmit
};

function onSubmit(libraryItemId, data, isAddMode, history) {
    return isAddMode ?
        createLibraryItem(data, history) :
        updateLibraryItem(libraryItemId, data, history);
}

function createLibraryItem(data, history) {
    console.log("Service data: ", data);
    return libraryItemController.create(data)
        .then(() => {
            alertService.success('Library item added', {keepAfterRouteChange: true});
            history.push('.');
        })
        .catch(alertService.error);
}

function updateLibraryItem(libraryItemId, data, history) {
    return libraryItemController.update(libraryItemId, data)
        .then(() => {
            alertService.success('Library item updated', {keepAfterRouteChange: true});
            history.push('..');
        })
        .catch(alertService.error);
}