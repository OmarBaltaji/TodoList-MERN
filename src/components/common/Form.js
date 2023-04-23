import React, { useRef, useEffect } from 'react';
import Button from './Button';
import '../../styles/css/main.css';

export default function Form ({
  handleOnSubmit, value, handleOnChange, handleKeyDown, isEdit = false, 
  inputPlaceholder = "Please enter a title for your list", listId = null, item = null, handleClickOutsideForm = null
}) {
  const formRef = useRef(null);

  const handleClickOutsideOfElement = (e) => {
    if (formRef.current && !formRef.current.contains(e.target))
      handleClickOutsideForm(listId, item);
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideOfElement);
    return () => document.removeEventListener('click', handleClickOutsideOfElement);
  }, []);


  return (
    <form className='d-flex justify-content-center align-items-center w-100 h-100' ref={formRef}>
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