import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { checkIfObjEmpty } from '../../utilities';
import Form from '../common/Form';
import { ItemObject } from '../../models';

interface Props {
  item: ItemObject;
  listId: string | undefined; 
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>; 
  onDeleteHandler: React.MouseEventHandler<SVGSVGElement>; 
  onSubmitHandler: React.MouseEventHandler<HTMLButtonElement>; 
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onCheckHandler: React.ChangeEventHandler<HTMLInputElement>;
  itemNameValue: string;
  handleShowItemNameForm: React.MouseEventHandler<HTMLSpanElement>;
  handleClickOutsideForm: (listId: string | undefined, item: ItemObject | undefined) => void;
}

const Item: React.FC<Props> = ({item, listId, onChangeHandler, onDeleteHandler, onSubmitHandler, handleKeyDown, onCheckHandler, itemNameValue, handleShowItemNameForm, handleClickOutsideForm}) => {  
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

export default Item;