import React from 'react';

interface Props {
  className: string;
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  innerText: string;
  id?: string;
}

const Button: React.FC<Props> = ({ className, onClickHandler, innerText}) => {
  return (
    <button className={'btn ' + className} onClick={onClickHandler}>
      {innerText}
    </button>
  )
}

export default Button;