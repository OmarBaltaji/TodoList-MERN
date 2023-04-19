import React from 'react';
import Button from './Button';
import '../../styles/css/form.css';

export default function Form({handleOnSubmit, value, handleOnChange, handleKeyDown, isEdit = false, inputPlaceholder = "Please enter a title for your list"}) {
 
  return (
    <form className='d-flex justify-content-center align-items-center w-100 h-100'>
    <div className='input-group w-75'>
      <input 
          className="form-control text-center"
          aria-describedby="button-addon2"
          required
          value={value}
          onChange={handleOnChange}
          placeholder={inputPlaceholder}
          onKeyDown={handleKeyDown}
          autoFocus
      />
      <Button 
          className="btn btn-outline-primary border-rounded-end"  
          onClickHandler={handleOnSubmit}
          innerText={isEdit ? "Edit" : "Add"}
          id="button-addon2"
      />
    </div>
    </form>
  )
}