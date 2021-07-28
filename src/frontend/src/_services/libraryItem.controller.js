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

function update(id, params) {
    console.log(params);
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
