import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';

export default function Toast ({show, type, message, onCloseToast}) {
  useEffect(() => {
    if(show) {
      const timeoutId = setTimeout(() => onCloseToast(), 5000);
      return () => clearTimeout(timeoutId);
    }

  }, [show]);

  return (
    show && 
    <div className='position-absolute' style={{ top: '20px', right: '20px' }}>
      <div 
        className={"toast align-items-center text-white border-0 opacity-100 " + (type === 'success' ? 'bg-success' : 'bg-danger')} 
        role="alert" aria-live="assertive" aria-atomic="true"
      >
        <div className="d-flex align-items-center">
          <div className="toast-body">
            {message}
          </div>
          <div className='p-3 ml-auto'>
            <span className="text-white hoverable cursor-pointer" data-bs-dismiss="toast" aria-label="Close" onClick={onCloseToast}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}