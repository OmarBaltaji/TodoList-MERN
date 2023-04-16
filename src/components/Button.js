import React from 'react';

export default function Button({ className, onClickHandler, innerText}) {
  return (
    <button className={'btn mr-2 ' + className} onClick={onClickHandler}>
      {innerText}
    </button>
  )
}