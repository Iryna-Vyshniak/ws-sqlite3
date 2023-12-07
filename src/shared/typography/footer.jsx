/* eslint-disable react/prop-types */
import { Row } from './base';
import { vspx } from './viewsize';

const Footer = ({ children, height, ...props }) => {
  return (
    <Row height={height} alignItems='center' justifyContent='center' padding={vspx(10)} {...props}>
      {children}
    </Row>
  );
};

export default Footer;
