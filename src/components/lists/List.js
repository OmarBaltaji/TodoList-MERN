import React from 'react';
import {checkIfObjEmpty} from '../../utilities';
import Form from '../common/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function List({list, onDeleteHandler, onChangeHandler, titleValue, onSubmitHandler, handleKeyDown, handleShowTitleForm}) {
  const displayNewEmptyList = () => (
    <Form handleOnChange={onChangeHandler} value={titleValue} handleOnSubmit={onSubmitHandler} handleKeyDown={handleKeyDown} />
  );

  const displayEditTitleForm = (list) => (
    <Form handleOnChange={onChangeHandler} value={list.title} handleOnSubmit={onSubmitHandler} handleKeyDown={handleKeyDown} isEdit={true} />
  )

  const displayExistingList = () => (
    <>
      <div className='card--header position-relative text-danger'>
        <FontAwesomeIcon className='position-absolute delete-icon cursor-pointer' icon={faTrashCan} onClick={onDeleteHandler} />
      </div>
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
      <div className='card'>
        {checkIfObjEmpty(list) ? displayNewEmptyList() : displayExistingList()}
      </div>
    </div>
  );
}