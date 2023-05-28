import React from 'react';
import { checkIfObjEmpty } from '../../helpers/utilities';
import Form from '../common/Form';
import { ItemObject } from '../../models';
import ExistingItem from './ExistingItem';

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

  return (
    <div className="list-group-item d-flex align-items-center">
      {checkIfObjEmpty(item) ? displayForm() :
        (item.showNameForm ? 
          displayForm(true) : 
          <ExistingItem item={item} onCheckHandler={onCheckHandler} onDeleteHandler={onDeleteHandler} handleShowItemNameForm={handleShowItemNameForm} />
        )
      }
    </div>
  )
}

export default Item;