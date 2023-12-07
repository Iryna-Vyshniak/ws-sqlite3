/* eslint-disable react/prop-types */
import React from 'react';

const Input = ({
  id,
  type,
  name,
  min,
  max,
  placeholder,
  value,
  required,
  accept,
  pattern,
  onChange,
  refValue,
  style,
  className,
  ...props
}) => {
  return (
    <input
      id={id}
      style={style}
      className={className}
      type={type}
      name={name}
      minLength={min}
      maxLength={max}
      ref={refValue}
      placeholder={placeholder}
      value={value}
      accept={accept}
      required={required}
      pattern={pattern}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input;
