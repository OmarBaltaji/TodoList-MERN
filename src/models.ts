export interface ListObject {
  _id?: string;
  title?: string;
  items?: ItemObject[];
  showTitleForm?: boolean; 
}

export interface ItemObject {
  _id?: string;
  name?: string;
  done?: boolean;
  listId?: string;
  showNameForm?: boolean;
}

export interface ListResponse {
  list: ListObject
}

export interface ListFormData {
  title: string;
}

export interface ItemFormData {
  name?: string;
  listId?: string;
  done?: boolean;
}

export interface ItemResponse {
  item: ItemObject
}
