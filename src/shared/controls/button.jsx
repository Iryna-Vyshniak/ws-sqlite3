/* eslint-disable react/prop-types */
import React from 'react';
import { vs } from '../typography/viewsize';
import { color } from '../typography/color';

const Button = ({ type, onClick, text, children, ...props }) => {
  const styles = {
    padding: vs(4),
    color: props.disabled ? color('grey') : color('primaryTitle'),
    backgroundColor: 'transparent',
    boxShadow: `0 2px 8px 0 ${color('primaryTitle')}`,
    border: 'none',
    borderRadius: '8px',
    cursor: props.disabled ? 'default' : 'pointer',
    ...props,
  };

  return (
    <button
      type={type}
      disabled={props.disabled}
      className={props.className}
      style={styles}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
