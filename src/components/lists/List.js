import React from 'react';
import {checkIfObjEmpty} from '../../utilities';
import Form from '../common/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function List({list, onDeleteHandler, onChangeHandler, titleValue, onSubmitHandler, handleKeyDown, handleShowTitleForm, handleOnMouseLeave}) {
  const displayForm = (value, isEdit) => (
    <Form handleOnChange={onChangeHandler} value={value} handleOnSubmit={onSubmitHandler} handleKeyDown={handleKeyDown} isEdit={isEdit} />
  )

  const displayEmptyListForm = () => (
    displayForm(titleValue, false)
  );

  const displayEditTitleForm = (list) => (
    displayForm(list.title, true)
  )

  const displayExistingList = () => (
    <>
      <div 
        className='card-title d-flex justify-content-center align-items-center text-dark h-100 mb-0' 
        onClick={handleShowTitleForm} 
        onKeyDown={handleKeyDown}
      >
        {list.showTitleForm ? displayEditTitleForm(list) : <span className='card-title-text cursor-pointer'>{list.title}</span>}
      </div>
      <div className='card-text'>
        {/* items */}
      </div>
    </>
  )

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