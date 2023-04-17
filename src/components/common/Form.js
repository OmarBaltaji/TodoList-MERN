import React from 'react';
import Button from './Button';
import '../../styles/css/form.css';

export default function Form({handleOnSubmit, value, handleOnChange, handleKeyDown, isEdit = false, inputPlaceholder = "Please enter a title for your list"}) {
 
  return (
    <form className='d-flex flex-column justify-content-between h-100'>
      <div>
        <input 
            className="form-control"
            aria-describedby="button-addon2"
            required
            value={value}
            onChange={handleOnChange}
            placeholder={inputPlaceholder}
            onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <Button 
            className="btn-outline-primary border-rounded-end w-100"  
            onClickHandler={handleOnSubmit}
            innerText={isEdit ? "Edit" : "Add"}
            id="button-addon2"
        />
      </div>
    </form>
  )
}