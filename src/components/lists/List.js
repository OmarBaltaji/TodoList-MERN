import React from 'react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

export default function List({list, onEditHandler, onDeleteHandler}) {
  return (
    <div className='col-md-3 mb-3 mt-3'>
        <div className='card'>
        <Link to={`/list/${list._id}`} className="text-decoration-none">
            <div className="card-body">
              <div className='card-title text-center text-dark'>
                {list.title}
              </div>
              <div className='card-text'>

              </div>
            </div>
        </Link>
          <div className='card-footer text-center'>
            <Button className="btn-primary mr-3" onClickHandler={onEditHandler} innerText="Edit" />
            <Button className="btn-danger" onClickHandler={onDeleteHandler} innerText="Delete" />
          </div>
        </div>
    </div>
  );
}