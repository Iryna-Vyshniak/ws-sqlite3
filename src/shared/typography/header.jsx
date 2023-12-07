/* eslint-disable react/prop-types */
import React from 'react';
import { Row } from './base';
import { vs } from './viewsize';

const Header = ({ children, height, ...props }) => {
  return (
    <Row
      alignItems='center'
      justifyContent='space-between'
      padding={vs(40)}
      height={height}
      {...props}
    >
      {children}
    </Row>
  );
};

export default Header;
