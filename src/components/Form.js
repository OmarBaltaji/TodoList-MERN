import React from 'react';
import Button from './Button';
import '../styles/css/form.css';

export default function Form({handleOnSubmit, value, handleOnChange}) {
 
  return (
    <form className='col-md-4 mb-4'>
      <div className="input-group mb-3">
        <input 
            className="ml-5 px-2 form-control"
            aria-describedby="button-addon2"
            required
            value={value}
            onChange={handleOnChange}
            placeholder="Please enter a title for your list"
        />
        <Button 
            className="btn-outline-primary border-rounded-end"  
            onClickHandler={handleOnSubmit}
            innerText="Add"
            id="button-addon2"
        />
      </div>
    </form>
  )
}