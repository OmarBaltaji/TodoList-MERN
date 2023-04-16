import React from 'react';
import Button from './Button';
import '../../styles/css/form.css';

export default function Form({handleOnSubmit, value, handleOnChange, isEdit = false, inputPlaceholder = "Please enter a title for your list"}) {
 
  return (
    <form className='pl-0 col-md-4 mb-4'>
      <div className="input-group mb-3">
        <input 
            className="form-control"
            aria-describedby="button-addon2"
            required
            value={value}
            onChange={handleOnChange}
            placeholder={inputPlaceholder}
        />
        <Button 
            className="btn-outline-primary border-rounded-end"  
            onClickHandler={handleOnSubmit}
            innerText={isEdit ? "Edit" : "Add"}
            id="button-addon2"
        />
      </div>
    </form>
  )
}