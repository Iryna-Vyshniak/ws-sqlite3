/* eslint-disable react/prop-types */
import React from 'react';
import { Column, Item, Row } from './base';
import { vspx } from './viewsize';
import { color } from './color';

const Article = ({ children, header, footer, ...props }) => {
  return (
    <Column borderRadius={vspx(5)} {...props}>
      <Row
        justifyContent='center'
        marginBottom={vspx(5)}
        height={vspx(40)}
        borderBottom={vspx(1) + ' solid transparent'}
        borderImage={`linear-gradient(to right, transparent 20%, ${color(
          'primaryText'
        )}, transparent 80%) 1`}
        visibility={header ? 'visible' : 'hidden'}
      >
        {header}
      </Row>
      <Item flex='grow'>{children}</Item>
      <Row
        justifyContent='center'
        marginTop={vspx(5)}
        marginBottom={vspx(5)}
        height={vspx(40)}
        borderTop={vspx(1) + ' solid transparent'}
        borderImage={`linear-gradient(to right, transparent 20%, ${color(
          'primaryText'
        )}, transparent 80%) 1`}
        visibility={footer ? 'visible' : 'hidden'}
      >
        {footer}
      </Row>
    </Column>
  );
};

export default Article;
