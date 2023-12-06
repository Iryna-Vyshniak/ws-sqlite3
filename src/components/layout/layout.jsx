import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../shared/typography/header';
import { Column, Image } from '../../shared/typography/base';
import Footer from '../../shared/typography/footer';

import ThemeSwitcher from '../theme-switcher/theme.switcher';
import Logo from '../../assets/images/logo.png';
import { vs, vspx } from '../../shared/typography/viewsize';
import { color } from '../../shared/typography/color';

const Layout = () => {
  return (
    <>
      <Header
        height={vs(50)}
        style={{ background: color('background'), boxShadow: `0 24px 26px 7px rgba(7,145,0,0.1)` }}
      >
        <Image src={Logo} alt='logo' style={{ marginLeft: vspx(20) }} width={vspx(80)} />
        <ThemeSwitcher />
      </Header>
      <Column
        alignContent='center'
        justifyContent='center'
        padding={vspx(40)}
        height={`calc(100vh - ${vs(160)}px)`}
        style={{ background: color('background') }}
      >
        <Suspense fallback={<h3>Loading...</h3>}>
          <Outlet />
        </Suspense>
      </Column>
      <Footer height={vs(70)} style={{ background: color('background') }}>
        <p
          style={{
            color: color('primaryText'),
            fontSize: vspx(12),
          }}
        >
          SqlWs.com, {`${new Date().getFullYear()}`}
        </p>
      </Footer>
    </>
  );
};

export default Layout;
