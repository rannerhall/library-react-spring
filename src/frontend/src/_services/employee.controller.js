import config from 'config';
import {fetchWrapper} from '@/_helpers';

const baseUrl = `${config.apiUrl}/employee`;

export const employeeController = {
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
    if (params.managerId === "" || params.managerId === undefined) {
        params.managerId = "0"
    }
    return fetchWrapper.post(`${baseUrl}/${params.role}/${params.rank}/${params.managerId}`, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
