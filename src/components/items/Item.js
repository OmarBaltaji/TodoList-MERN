import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { checkIfObjEmpty } from '../../utilities';
import Form from '../common/Form';

export default function Item ({item, listId, onChangeHandler, onDeleteHandler, onSubmitHandler, handleKeyDown, onCheckHandler, itemNameValue, handleShowItemNameForm, handleClickOutsideForm}) {  
  const displayForm = (isEdit = false) => (
    <Form handleOnChange={onChangeHandler} value={itemNameValue} handleOnSubmit={onSubmitHandler} handleKeyDown={handleKeyDown} isEdit={isEdit} handleClickOutsideForm={handleClickOutsideForm} item={item} listId={listId} />
  )

  const displayItem = () => (
    <>
      <span title='Edit' className={'mr-3 ' + (item.done ? 'text-decoration-line-through' : 'hoverable cursor-pointer')} onClick={handleShowItemNameForm}>{item.name}</span>
      <div className='mr-auto position-relative hoverable'>
        <input className='item-check-box opacity-0 cursor-pointer' type="checkbox" onChange={onCheckHandler} checked={item.done}  />
        <FontAwesomeIcon icon={faCheck} className={'hoverable ' + (item.done ? 'text-success' : '')} />
      </div>
      <FontAwesomeIcon className='delete-icon cursor-pointer text-danger hoverable' icon={faXmark} onClick={onDeleteHandler} />
    </>
  )


  return (
    <div className="list-group-item d-flex align-items-center">
      {checkIfObjEmpty(item) ? 
        displayForm()
      :
        (item.showNameForm ? displayForm(true) : displayItem())
      }
    </div>
  )
}