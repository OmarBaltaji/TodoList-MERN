import React from 'react';
import Button from './common/Button';
import { useHistory } from 'react-router-dom';

export default function ListItem ({item, onChangeHandler, onDeleteHandler}) {
  const history = useHistory();

  const goToEditPage = (itemId) => {
    history.push(`/edititem/${itemId}`);
  }

  return (
    <div  className="row align-items-center mb-3">
        <li className='mr-2'>{item.name}</li>
        <input 
            className="mt-1 mr-2" 
            type="checkbox" 
            onChange={onChangeHandler}
            checked={item.done}  
        />
        <Button className="btn-primary" onClickHandler={() => goToEditPage(item._id)} innerText="Edit" />
        <Button className="btn-danger" onClickHandler={onDeleteHandler} innerText="Delete" />
    </div>
  )
}