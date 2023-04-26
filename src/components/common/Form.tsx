import React, { useRef, useEffect } from 'react';
import Button from './Button';
import '../../styles/css/main.css';
import { ItemObject } from '../../models';

interface Props {
  handleOnSubmit: React.MouseEventHandler<HTMLButtonElement>;
  value: string | undefined;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  isEdit: boolean;
  inputPlaceholder?: string;
  listId?: string | undefined;
  item?: ItemObject;
  handleClickOutsideForm?: (listId: string | undefined, item: ItemObject | undefined) => void;
}

const Form: React.FC <Props> = ({
  handleOnSubmit, value, handleOnChange, handleKeyDown, isEdit = false, 
  inputPlaceholder = "Please enter a title for your list", listId, item, handleClickOutsideForm
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleClickOutsideOfElement = (e: any) => {
    if (!formRef.current?.contains(e.target) && typeof handleClickOutsideForm === 'function')
      handleClickOutsideForm(listId, item);
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideOfElement);
    formRef.current?.scrollIntoView({ behavior: 'smooth'});
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

export default Form;