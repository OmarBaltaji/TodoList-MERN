import React from 'react';
import Button from '../common/Button';
import {checkIfObjEmpty} from '../../utilities';
import Form from '../common/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function List({list, onEditHandler, onDeleteHandler, onChangeHandler, titleValue, onSubmitHandler, handleKeyDown}) {
  const displayNewEmptyList = () => (
    <Form handleOnChange={onChangeHandler} value={titleValue} handleOnSubmit={onSubmitHandler} handleKeyDown={handleKeyDown} />
  );

  const displayExistingList = () => (
    <>
      <div className='card--header text-right pt-3 pr-3 text-danger'>
        <FontAwesomeIcon icon={faTrashCan} onClick={onDeleteHandler} />
      </div>
      <div className="card-body" title='Edit'>
        <div className='card-title text-center text-dark'>
          {list.title}
        </div>
        <div className='card-text'>
          {/* items */}
        </div>
      </div>
      <div className='card-footer text-center'>
        <Button className="btn-primary mr-3" onClickHandler={onEditHandler} innerText="Edit" />
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