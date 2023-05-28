import React from 'react'

interface Props {
  property: string;
  value: string | undefined;
  onBlurHandler: (e: React.FocusEvent<HTMLInputElement>, property: string) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, property: string) => void;
  error: string | undefined;
}

const Input: React.FC<Props> = ({ property, value, onBlurHandler, onChangeHandler, error }) => {
  return (
    <div className="row mb-4">
      <label htmlFor={property} className="col-sm-3 col-form-label">{ property.charAt(0).toUpperCase() + property.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2') }</label>
      <div className="col-sm-9">
        <input type={property} className="form-control" id={property} value={value} onBlur={(e) => onBlurHandler(e, property)} onChange={(e) => onChangeHandler(e, property)} />
        {error && <div className='text-danger mt-1'>{error}</div>}
      </div>
    </div>
  )
}

export default Input;