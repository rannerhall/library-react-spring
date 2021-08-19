import config from 'config';
import {fetchWrapper} from '@/_helpers';

const baseUrl = `${config.apiUrl}/libraryItem`;

export const libraryItemController = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}/${params.categoryName}`, params);
}

function update(id, params, checkOutOrIn) {
    if (!checkOutOrIn) {
        checkOutOrIn = false;
    }
    console.log(checkOutOrIn);
    return fetchWrapper.put(`${baseUrl}/${id}/${checkOutOrIn}/${params.categoryName}`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
