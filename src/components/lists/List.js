import React from 'react';
import {checkIfObjEmpty} from '../../utilities';
import Form from '../common/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Item from '../items/Item';

export default function List({list, onDeleteHandler, onChangeHandler, titleValue, onSubmitHandler, handleKeyDown, handleShowTitleForm, itemOnChangeHandler, itemOnDeleteHandler, addNewItemHandler, itemOnSubmitHandler, itemOnCheckHandler, itemNameValue, itemOnHandleKeyDown, handleShowItemNameForm}) {
  const displayForm = (value, isEdit) => (
    <Form handleOnChange={onChangeHandler} value={value} handleOnSubmit={onSubmitHandler} handleKeyDown={handleKeyDown} isEdit={isEdit} />
  )

  const displayEmptyListForm = () => (
    <div className='card justify-content-center'>
      <div className='my-5'>
        {displayForm(titleValue, false)}
      </div>
    </div>
  );

  const displayEditTitleForm = (list) => (
    displayForm(list.title, true)
  )

  const displayExistingList = () => {
    return (
      <>
        <div 
          className='card-title d-flex justify-content-center text-dark h-100 my-5' 
          onClick={handleShowTitleForm} 
          onKeyDown={handleKeyDown}
        >
          {list.showTitleForm ? displayEditTitleForm(list) : <span className='card-title-text hoverable cursor-pointer'>{list.title}</span>}
        </div>
        <div className='card-text'>
          <ul className="list-group">
              {list.items && list.items.length > 0 && 
                list.items.map(item => 
                  <Item 
                    item={item} 
                    listId = {list._id}
                    onChangeHandler={(e) => itemOnChangeHandler(e, list._id, item._id)} 
                    onDeleteHandler={() => itemOnDeleteHandler(list._id, item._id)} 
                    onCheckHandler={(e) => itemOnCheckHandler(e, item._id)}
                    onSubmitHandler={(e) => itemOnSubmitHandler(e, list._id, item)}
                    handleKeyDown={(e) => itemOnHandleKeyDown(e, list._id, item)}
                    handleShowItemNameForm={() => handleShowItemNameForm(list._id, item._id, true)}
                    key={item._id ?? 'newly-added-item'}   
                    itemNameValue={item.name ?? itemNameValue}
                  />
                )
              }
              <div className='list-group-item'>
                <span className='cursor-pointer d-flex align-items-center hoverable' onClick={(e) => addNewItemHandler(e, list._id)}>
                  <FontAwesomeIcon className='mr-2' icon={faCirclePlus} style={{ fontSize: "1.5rem" }} />
                  <strong>Add Item</strong>
                </span>
              </div>
            </ul>
        </div>
      </>
    )
  }

  return (
    <div className='col-md-3 my-3'>
      <div className={'card ' + (list.items && list.items.length > 4 ? 'scrollable' : '')}>
        <div className='card--header position-relative text-danger'>
          <FontAwesomeIcon className='position-absolute delete-icon cursor-pointer hoverable' icon={faTrashCan} onClick={onDeleteHandler} />
        </div>
        {checkIfObjEmpty(list) ? displayEmptyListForm() : displayExistingList()}
      </div>
    </div>
  );
}