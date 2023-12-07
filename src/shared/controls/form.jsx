import React from 'react';

// eslint-disable-next-line react/prop-types
const Form = ({ children, onSubmit, ...props }) => {
  return (
    <form style={props} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
