import React from 'react';
import {checkIfObjEmpty} from '../../utilities';
import Form from '../common/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Item from '../items/Item';

export default function List({list, onDeleteHandler, onChangeHandler, titleValue, onSubmitHandler, handleKeyDown, handleShowTitleForm, handleOnMouseLeave, itemOnChangeHandler, itemOnDeleteHandler}) {
  const displayForm = (value, isEdit) => (
    <Form handleOnChange={onChangeHandler} value={value} handleOnSubmit={onSubmitHandler} handleKeyDown={handleKeyDown} isEdit={isEdit} />
  )

  const displayEmptyListForm = () => (
    displayForm(titleValue, false)
  );

  const displayEditTitleForm = (list) => (
    displayForm(list.title, true)
  )

  const displayExistingList = () => {
    return (
      <>
        <div 
          className='card-title d-flex justify-content-center text-dark h-100 mb-0' 
          onClick={handleShowTitleForm} 
          onKeyDown={handleKeyDown}
        >
          {list.showTitleForm ? displayEditTitleForm(list) : <span className='card-title-text cursor-pointer pt-5 pb-4'>{list.title}</span>}
        </div>
        <div className='card-text'>
          <ul className="list-group">
              {list.items && list.items.length > 0 && 
                list.items.map(item => 
                  <Item 
                    item={item} 
                    onChangeHandler={(e) => itemOnChangeHandler(e, item._id)} 
                    onDeleteHandler={(e) => itemOnDeleteHandler(e, item._id)} 
                    key={item._id}   
                  />
                )
              }
            </ul>
        </div>
      </>
    )
  }

  return (
    <div className='col-md-3 my-3'>
      <div className='card' onMouseLeave={handleOnMouseLeave}>
        <div className='card--header position-relative text-danger'>
          <FontAwesomeIcon className='position-absolute delete-icon cursor-pointer' icon={faTrashCan} onClick={onDeleteHandler} />
        </div>
        {checkIfObjEmpty(list) ? displayEmptyListForm() : displayExistingList()}
      </div>
    </div>
  );
}