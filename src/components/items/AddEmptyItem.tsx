import React from 'react';
import { checkIfObjEmpty } from '../../helpers/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ListObject } from '../../models';

interface Props {
  list: ListObject,
  addNewItemHandler: (listId: string | undefined) => void
}

const AddEmptyItem: React.FC<Props> = ({list, addNewItemHandler}) => {
  return (
    <div className={'list-group-item ' +  (list.items && list.items.length > 0  && (checkIfObjEmpty(list?.items[list?.items?.length - 1]) || list.items.some(item => item.showNameForm))  ? 'pe-none' : '')}>
    <span className='cursor-pointer d-flex align-items-center hoverable' onClick={() => addNewItemHandler(list._id)}>
      <FontAwesomeIcon className='mr-2' icon={faCirclePlus} style={{ fontSize: "1.5rem" }} />
      <strong>Add Item</strong>
    </span>
  </div>
  )
}

export default AddEmptyItem;