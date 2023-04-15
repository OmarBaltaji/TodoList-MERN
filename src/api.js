import axios from "axios";
const baseUrl = 'http://localhost:5000/';
const itemApiUrl = baseUrl + 'api/v1/items/';
const listApiUrl = baseUrl + 'api/v1/lists/';

export default {
  getAllLists: () => axios.get(listApiUrl),
  createList: (formData) => axios.post(listApiUrl, { ...formData }),
  getList: (id) => axios.get(`${listApiUrl}${id}`),
  deleteList: (id) => axios.delete(`${listApiUrl}${id}`),
  updateList: (id, formData) => axios.patch(`${listApiUrl}${id}`, { ...formData }),
}