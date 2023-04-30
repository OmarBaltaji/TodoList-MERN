import React from 'react';
import {checkIfObjEmpty} from '../../utilities';
import Form from '../common/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Item from '../items/Item';
import { ListObject, ItemObject } from '../../models';
import AddEmptyItem from '../items/AddEmptyItem';

interface Props {
  list: ListObject;
  onDeleteHandler: React.MouseEventHandler<SVGSVGElement>;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  titleValue: string;
  onSubmitHandler: React.MouseEventHandler<HTMLButtonElement>;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>; 
  handleShowTitleForm: React.MouseEventHandler<HTMLDivElement>;
  itemOnChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, listId: string | undefined, itemId: string | undefined) => void;
  itemOnDeleteHandler: (listId: string | undefined, itemId: string | null) => void;
  addNewItemHandler: (listId: string | undefined) => void;
  itemOnSubmitHandler: (e: React.FormEvent<EventTarget>, listId: string | undefined, itemFromForm: ItemObject) => void;
  itemOnCheckHandler: (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => void;
  itemNameValue: string;
  itemOnHandleKeyDown: (e: React.KeyboardEvent, listId: string, item: ItemObject) => void;
  handleShowItemNameForm: (listId: string | undefined, itemFromForm: ItemObject, shouldShow: boolean) => void;
  handleClickOutsideForm: (listId: string | undefined, item: ItemObject | undefined) => void;
}

const List: React.FC<Props> = ({list, onDeleteHandler, onChangeHandler, titleValue, onSubmitHandler, handleKeyDown, handleShowTitleForm, itemOnChangeHandler, itemOnDeleteHandler, addNewItemHandler, itemOnSubmitHandler, itemOnCheckHandler, itemNameValue, itemOnHandleKeyDown, handleShowItemNameForm, handleClickOutsideForm}) => {
  const displayForm = (value: string | undefined, isEdit: boolean) => (
    <Form handleOnChange={onChangeHandler} value={value} handleOnSubmit={onSubmitHandler} handleKeyDown={handleKeyDown} isEdit={isEdit} listId={list._id} handleClickOutsideForm={handleClickOutsideForm} />
  )

  const displayEmptyListForm = () => (
    <div className='card justify-content-center'>
      <div className='my-5'>
        {displayForm(titleValue, false)}
      </div>
    </div>
  );

  const displayEditTitleForm = (list: ListObject) => (
    displayForm(list.title, true)
  )

  const checkItemHandler = (e: React.ChangeEvent<HTMLInputElement>, itemId: string | undefined) => {
    if(itemId)
      itemOnCheckHandler(e, itemId)
  }

  const keyDownItemHandler = (e: React.KeyboardEvent, listId: string | undefined, item: ItemObject) => {
    if(listId)
      itemOnHandleKeyDown(e, listId, item)
  }

  const displayExistingList = () => {
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

  return (
    <div className='col-md-3 my-3'>
      <div className={'card shadow ' + (list.items && list.items.length > 4 ? 'scrollable' : '')}>
        <div className='card--header position-relative text-danger'>
          <FontAwesomeIcon className='position-absolute delete-icon cursor-pointer hoverable' icon={faTrashCan} onClick={onDeleteHandler} />
        </div>
        {checkIfObjEmpty(list) ? displayEmptyListForm() : displayExistingList()}
      </div>
    </div>
  );
}

export default List;