import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { checkIfObjEmpty } from '../../utilities';
import Form from '../common/Form';

export default function Item ({item, onChangeHandler, onDeleteHandler, onSubmitHandler, handleKeyDown, onCheckHandler, itemNameValue, handleShowItemNameForm}) {
  const displayForm = (isEdit = false) => (
    <Form handleOnChange={onChangeHandler} value={itemNameValue} handleOnSubmit={onSubmitHandler} handleKeyDown={handleKeyDown} isEdit={isEdit} />
  )

  const displayItem = () => (
    <>
      <span className={'mr-3 ' + (item.done ? 'text-decoration-line-through' : 'hoverable cursor-pointer')} onClick={handleShowItemNameForm}>{item.name}</span>
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