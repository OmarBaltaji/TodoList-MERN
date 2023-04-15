import axios from "axios";
const baseUrl = 'http://localhost:5000/';
const itemApiUrl = baseUrl + 'api/v1/items/';
const listApiUrl = baseUrl + 'api/v1/lists/';

export default {
  // Lists
  getAllLists: () => axios.get(listApiUrl),
  createList: (formData) => axios.post(listApiUrl, { ...formData }),
  getList: (id) => axios.get(`${listApiUrl}${id}`),
  deleteList: (id) => axios.delete(`${listApiUrl}${id}`),
  updateList: (id, formData) => axios.patch(`${listApiUrl}${id}`, { ...formData }),

  //Items
  getListItems: (listId) => axios.post(itemApiUrl, { listId }),
  createItem: (formData) => axios.post(`${itemApiUrl}add`, { ...formData }),
  getItem: (id) => axios.get(`${itemApiUrl}${id}`),
  deleteItem: (id) => axios.delete(`${itemApiUrl}${id}`),
  updateItem: (id, formData) => axios.patch(`${itemApiUrl}${id}`, { ...formData }),
}