/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ListFormData, ItemFormData, AllListsResponse, ListResponse, AllItemsResponse, ItemResponse } from './models';
const baseUrl = process.env.REACT_APP_BASE_URL;
const itemApiUrl = baseUrl + 'api/v1/items/';
const listApiUrl = baseUrl + 'api/v1/lists/';

export default {
  // Lists
  getAllLists: () => axios.get<AllListsResponse>(listApiUrl),
  createList: (formData: ListFormData) => axios.post<ListResponse>(listApiUrl, { ...formData }),
  getList: (id: string) => axios.get<ListResponse>(`${listApiUrl}${id}`),
  deleteList: (id: string) => axios.delete<string>(`${listApiUrl}${id}`),
  updateList: (id: string, formData: ListFormData) => axios.patch<ListResponse>(`${listApiUrl}${id}`, { ...formData }),

  //Items
  getListItems: (listId: string) => axios.post<AllItemsResponse>(itemApiUrl, { listId }),
  createItem: (formData: ItemFormData) => axios.post<ItemResponse>(`${itemApiUrl}add`, { ...formData }),
  getItem: (id: string) => axios.get<ItemResponse>(`${itemApiUrl}${id}`),
  deleteItem: (id: string) => axios.delete<string>(`${itemApiUrl}${id}`),
  updateItem: (id: string, formData: ItemFormData) => axios.patch<ItemResponse>(`${itemApiUrl}${id}`, { ...formData }),
}