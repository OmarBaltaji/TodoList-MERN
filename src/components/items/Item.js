import React from 'react';
import Button from '../common/Button';
import { useHistory } from 'react-router-dom';

export default function Item ({item, onChangeHandler, onDeleteHandler}) {
  const history = useHistory();

  return (
    <div  className="d-flex align-items-center mb-3">
        <li className='mr-3'>{item.name}</li>
        <input 
            className="mr-4" 
            type="checkbox" 
            onChange={onChangeHandler}
            checked={item.done}  
        />
        <Button className="btn-primary mr-3" onClickHandler={() => history.push(`/edititem/${item._id}`)} innerText="Edit" />
        <Button className="btn-danger" onClickHandler={onDeleteHandler} innerText="Delete" />
    </div>
  )
}