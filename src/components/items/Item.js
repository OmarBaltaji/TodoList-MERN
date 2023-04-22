import React from 'react';
import Button from '../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Item ({item, onChangeHandler, onDeleteHandler}) {

  return (
    <div className="list-group-item d-flex">
        <span className={'mr-3 ' + (item.done ? 'text-decoration-line-through' : '')}>{item.name}</span>
        <div className='mr-auto position-relative hoverable'>
          <input className='item-check-box opacity-0 cursor-pointer' type="checkbox" onChange={onChangeHandler} checked={item.done}  />
          <FontAwesomeIcon icon={faCheck} className={item.done ? 'text-success' : ''} />
        </div>
        {/* <Button className="btn-primary mr-3" onClickHandler={() => history.push(`/edititem/${item._id}`)} innerText="Edit" /> */}
        <FontAwesomeIcon className='delete-icon cursor-pointer text-danger' icon={faXmark} onClick={onDeleteHandler} />
    </div>
  )
}