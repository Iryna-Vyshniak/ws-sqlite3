/* eslint-disable react/prop-types */
import React from 'react';
import { Row } from './base';
import { vs, vspx } from './viewsize';

const Header = ({ children, height, style, ...props }) => {
  return (
    <Row
      alignItems='center'
      justifyContent='space-between'
      padding={vs(40)}
      height={height}
      borderBottom={vspx(1) + ' solid transparent'}
      boxShadow={style.boxShadow}
      style={props}
    >
      {children}
    </Row>
  );
};

export default Header;
