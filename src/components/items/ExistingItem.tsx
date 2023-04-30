import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ItemObject } from "../../models";

interface Props {
  item: ItemObject,
  onCheckHandler: React.ChangeEventHandler<HTMLInputElement>,
  onDeleteHandler: React.MouseEventHandler<SVGSVGElement>,
  handleShowItemNameForm: React.MouseEventHandler<HTMLSpanElement>,
}

const displayItem: React.FC<Props> = ({item, onCheckHandler, onDeleteHandler, handleShowItemNameForm}) => (
  <>
    <span title='Edit' className={'mr-3 ' + (item.done ? 'text-decoration-line-through' : 'hoverable cursor-pointer')} onClick={handleShowItemNameForm}>{item.name}</span>
    <div className='mr-auto position-relative hoverable'>
      <input className='item-check-box opacity-0 cursor-pointer' type="checkbox" onChange={onCheckHandler} checked={item.done}  />
      <FontAwesomeIcon icon={faCheck} className={'hoverable ' + (item.done ? 'text-success' : '')} />
    </div>
    <FontAwesomeIcon className='delete-icon cursor-pointer text-danger hoverable' icon={faXmark} onClick={onDeleteHandler} />
  </>
)

export default displayItem;