import React from 'react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

export default function List({list, onEditHandler, onDeleteHandler}) {
  return (
    <div className="d-flex mb-4 align-items-center">
      <li className='mr-4'><Link to={`/list/${list._id}`}>{list.title}</Link></li>
      <Button className="btn-primary mr-3" onClickHandler={onEditHandler} innerText="Edit" />
      <Button className="btn-danger" onClickHandler={onDeleteHandler} innerText="Delete" />
    </div>
  );
}