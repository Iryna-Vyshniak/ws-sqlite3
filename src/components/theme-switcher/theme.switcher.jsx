import React, { useEffect } from 'react';
import { color } from '../../shared/typography/color';
import { vspx } from '../../shared/typography/viewsize';
import { useGlobalStates } from '../../shared/context/global.states.context';
import Button from '../../shared/controls/button';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useGlobalStates();

  const textTheme = theme === 'dark' ? 'Light' : 'Dark';

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    document.body.style.backgroundColor = color('background');
  }, [theme]);

  return (
    <Button
      type='button'
      style={{
        background: color('primary'),
        color: color('primaryText'),
        fontSize: vspx(12),
        cursor: 'pointer',
      }}
      onClick={toggleTheme}
    >
      <span>{textTheme}</span>
    </Button>
  );
};

export default ThemeSwitcher;
