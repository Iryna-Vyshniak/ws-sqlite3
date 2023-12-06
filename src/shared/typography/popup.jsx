/* eslint-disable react/prop-types */
import React from 'react';
import { Block } from './base';
import { vspx } from './viewsize';
import { color } from './color';

const Popup = ({ children, blurOff, close, opened, ...props }) => {
  return (
    <Block
      position='fixed'
      top='0'
      left='0'
      width='100%'
      height='100%'
      zIndex='1'
      background={blurOff ? 'transparent' : `rgba(0, 0, 0, 0.5)`}
      backdropFilter={blurOff ? 'none' : 'blur(10px)'}
      onClick={close}
      visibility={opened ? 'visible' : 'hidden'}
    >
      <Block
        {...props}
        position='relative'
        borderRadius={vspx(10)}
        backgroundColor={color('background')}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Block>
    </Block>
  );
};

export default Popup;
