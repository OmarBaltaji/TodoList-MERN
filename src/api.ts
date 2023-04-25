/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ListResponse } from "./models";
import { ListFormData, ItemFormData } from './models';
const baseUrl = 'http://localhost:5000/';
const itemApiUrl = baseUrl + 'api/v1/items/';
const listApiUrl = baseUrl + 'api/v1/lists/';


export default {
  // Lists
  getAllLists: () => axios.get(listApiUrl),
  createList: (formData: ListFormData) => axios.post<ListResponse>(listApiUrl, { ...formData }),
  getList: (id: string) => axios.get(`${listApiUrl}${id}`),
  deleteList: (id: string) => axios.delete(`${listApiUrl}${id}`),
  updateList: (id: string, formData: ListFormData) => axios.patch(`${listApiUrl}${id}`, { ...formData }),

  //Items
  getListItems: (listId: string) => axios.post(itemApiUrl, { listId }),
  createItem: (formData: ItemFormData) => axios.post(`${itemApiUrl}add`, { ...formData }),
  getItem: (id: string) => axios.get(`${itemApiUrl}${id}`),
  deleteItem: (id: string) => axios.delete(`${itemApiUrl}${id}`),
  updateItem: (id: string, formData: ItemFormData) => axios.patch(`${itemApiUrl}${id}`, { ...formData }),
}