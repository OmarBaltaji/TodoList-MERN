import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { checkIfObjEmpty } from '../../helpers/utilities';
import { ListObject } from '../../models';

interface Props {
  lists: ListObject[],
  addNewList: React.MouseEventHandler<HTMLSpanElement>
}

const AddEmptyList: React.FC<Props> = ({lists, addNewList}) => {
  return (
    <div className='col-md-3 my-3'>
      <div className='card shadow'>
          <div className='card-body d-flex align-items-center justify-content-center my-5'>
              <span 
                  className={'cursor-pointer d-flex align-items-center hoverable ' +  (lists && lists.length > 0 && checkIfObjEmpty(lists[lists?.length - 1])  ? 'pe-none' : '')}  
                  onClick={addNewList}
              >
                  <FontAwesomeIcon className='mr-2' icon={faCirclePlus} style={{ fontSize: "2rem" }} />
                  <strong>Add List</strong>
              </span>
          </div>
      </div>
  </div>
  )
}

export default AddEmptyList;