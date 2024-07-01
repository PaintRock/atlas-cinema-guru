import './general.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Input({ 
    label, 
    type, 
    className, 
    value, 
    setValue, 
    icon, 
    inputAttributes 
    }) {
      const handleInput = (event) => {
        setValue(event.target.value);
      };
  return (
    <div className={`input-container ${className}`}>
      {label && (
        <label>
          {icon && <FontAwesomeIcon icon={icon} className="input-icon" />}
          {label}
        </label>
      )}
      <div className="input-wrapper">
        <input 
          type={type}
          value={value}
          onChange={handleInput}
          {...inputAttributes}
        />
      </div>
    </div>
  );
}
