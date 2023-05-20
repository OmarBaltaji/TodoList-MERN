export interface ListDto {
  title: string;
}

export interface CreateItemDto {
  name: string;
  listId: string | undefined;
}

export interface EditItemDto {
  name?: string;
  listId?: string;
  done?: boolean;
}
