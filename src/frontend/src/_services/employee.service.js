import config from 'config';
import {fetchWrapper} from '@/_helpers';

const baseUrl = `${config.apiUrl}/employee`;

export const employeeService = {
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
    console.log("Params: ", params);
    return fetchWrapper.post(`${baseUrl}/${params.role}/${params.rank}/${params.managerId}`, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
