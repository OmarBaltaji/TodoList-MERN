import React from 'react';
import { ItemObject, ListObject } from '../../models';
import Item from '../items/Item';
import AddEmptyItem from '../items/AddEmptyItem';

interface Props {
  list: ListObject,
  handleShowTitleForm: React.MouseEventHandler<HTMLDivElement>, 
  handleKeyDown: React.KeyboardEventHandler<HTMLDivElement>, 
  itemOnChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, listId: string | undefined, itemId: string | undefined) => void, 
  itemOnDeleteHandler: (listId: string | undefined, itemId: string | null) => void, 
  checkItemHandler: (e: React.ChangeEvent<HTMLInputElement>, itemId: string | undefined) => void, 
  itemOnSubmitHandler: (e: React.FormEvent<EventTarget>, listId: string | undefined, item: ItemObject) => void, 
  keyDownItemHandler: (e: React.KeyboardEvent, listId: string | undefined, item: ItemObject) => void, 
  handleShowItemNameForm: (listId: string | undefined, item: ItemObject, shouldShow: boolean) => void, 
  handleClickOutsideForm: (listId: string | undefined | undefined, item: ItemObject | undefined) => void, 
  itemNameValue: string, 
  addNewItemHandler: (listId: string | undefined) => void, 
  displayEditTitleForm: (list: ListObject) => JSX.Element
}

const ExistingList: React.FC<Props> = ({list, handleShowTitleForm, handleKeyDown, itemOnChangeHandler, itemOnDeleteHandler, checkItemHandler, itemOnSubmitHandler, keyDownItemHandler, handleShowItemNameForm, handleClickOutsideForm, itemNameValue, addNewItemHandler, displayEditTitleForm }) => {
  return (
    <>
      <div 
        className='card-title d-flex justify-content-center text-dark h-100 my-5' 
        onClick={handleShowTitleForm} 
        onKeyDown={handleKeyDown}
      >
        {list.showTitleForm ? displayEditTitleForm(list) : <span title='Edit' className='card-title-text hoverable cursor-pointer'>{list.title}</span>}
      </div>
      <div className='card-text'>
        <ul className="list-group">
            {list.items && list.items.length > 0 && 
              list.items.map((item: ItemObject) => 
                <Item 
                  item={item} 
                  listId = {list._id}
                  onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => itemOnChangeHandler(e, list._id, item._id)} 
                  onDeleteHandler={() => itemOnDeleteHandler(list._id, item._id ?? null)} 
                  onCheckHandler={(e: React.ChangeEvent<HTMLInputElement>) => checkItemHandler(e, item._id)}
                  onSubmitHandler={(e: React.FormEvent<EventTarget>) => itemOnSubmitHandler(e, list._id, item)}
                  handleKeyDown={(e: React.KeyboardEvent) => keyDownItemHandler(e, list._id, item)}
                  handleShowItemNameForm={() => handleShowItemNameForm(list._id, item, true)}
                  handleClickOutsideForm={handleClickOutsideForm}
                  key={item._id ?? 'newly-added-item'}   
                  itemNameValue={item.name ?? itemNameValue}
                />
              )
            }
            <AddEmptyItem list={list} addNewItemHandler={addNewItemHandler} />
          </ul>
      </div>
    </>
  )
}

export default ExistingList;