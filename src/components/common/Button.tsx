import React from 'react';

export default function Button({ className, onClickHandler, innerText}) {
  return (
    <button className={'btn ' + className} onClick={onClickHandler}>
      {innerText}
    </button>
  )
}