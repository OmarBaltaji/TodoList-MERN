import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { checkIfObjEmpty } from '../../utilities';
import Form from '../common/Form';

export default function Item ({item, onChangeHandler, onDeleteHandler, onSubmitHandler, handleKeyDown, itemNameValue}) {
  return (
    <div className="list-group-item d-flex align-items-center">
      {checkIfObjEmpty(item) ? 
        <Form handleOnChange={onChangeHandler} value={item.name ?? itemNameValue} handleOnSubmit={onSubmitHandler} handleKeyDown={handleKeyDown} />
      :
        <>
          <span className={'mr-3 ' + (item.done ? 'text-decoration-line-through' : '')}>{item.name}</span>
          <div className='mr-auto position-relative hoverable'>
            <input className='item-check-box opacity-0 cursor-pointer' type="checkbox" onChange={onChangeHandler} checked={item.done}  />
            <FontAwesomeIcon icon={faCheck} className={'hoverable ' + (item.done ? 'text-success' : '')} />
          </div>
          {/* <Button className="btn-primary mr-3" onClickHandler={() => history.push(`/edititem/${item._id}`)} innerText="Edit" /> */}
          <FontAwesomeIcon className='delete-icon cursor-pointer text-danger hoverable' icon={faXmark} onClick={onDeleteHandler} />
        </>
      }
    </div>
  )
}