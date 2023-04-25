export interface ListObject {
  _id: string;
  title: string;
  items?: ItemObject[];
  showTitleForm?: boolean; 
}

export interface ItemObject {
  _id: string;
  name: string;
  done: boolean;
  listId: string;
  showNameForm?: boolean;
}
