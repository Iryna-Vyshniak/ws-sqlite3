/* eslint-disable react/prop-types */

import { vspx } from './viewsize';

const Item = ({ children, ...props }) => {
  return <div style={props}>{children}</div>;
};

const Block = ({ children, onClick, className, ...props }) => {
  return (
    <div style={props} className={className} onClick={onClick}>
      {children}
    </div>
  );
};

const Text = ({ text, onClick, className, ...props }) => {
  const styles = {
    color: color('foreground'),
    fontSize: vspx(16),
    ...props,
  };

  return (
    <p style={styles} className={className} onClick={onClick}>
      {text}
    </p>
  );
};

const Image = ({ src, alt, width, onClick, style, className, ...props }) => {
  return (
    <img
      style={style}
      className={className}
      src={src}
      alt={alt}
      width={width}
      onClick={onClick}
      {...props}
    />
  );
};

const Label = ({ htmlFor, className, text, ...props }) => {
  return (
    <label style={props} htmlFor={htmlFor} className={className}>
      {text}
    </label>
  );
};

const Row = ({ className, onClick, children, ...props }) => {
  const styles = {
    display: 'flex',
    ...props,
  };

  return (
    <div style={styles} className={className} onClick={onClick}>
      {children}
    </div>
  );
};

const Column = ({ className, onClick, children, ...props }) => {
  const columnStyles = {
    display: 'flex',
    flexDirection: 'column',
    ...props,
  };

  return (
    <div style={columnStyles} onClick={onClick}>
      {children}
    </div>
  );
};

export { Item, Block, Text, Image, Label, Row, Column };
