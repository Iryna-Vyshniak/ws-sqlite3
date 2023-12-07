const getThemeName = () => {
  return localStorage.getItem('theme');
};

const colorTheme = (dark, light) => {
  const themeName = getThemeName();
  if (themeName === 'dark') return dark;
  if (themeName === 'light') return light;
};

const color = (name) => {
  switch (name) {
    // Theme
    case 'accent':
      return colorTheme('#0a7cc2', '#c0e4ff');
    case 'foreground':
      return colorTheme('#cecece', '#f5f5f5');
    case 'background':
      return colorTheme('#080c12', '#ffffff');
    case 'hover':
      return colorTheme('#1e1177ff', '#a3b6ff');
    case 'highlight':
      return colorTheme('#1e354355', '#a3b6ff');
    case 'separator':
      return colorTheme('#303030', '#d9d9d9');

    // Primary
    case 'primary':
      return colorTheme('#080c12', '#b3c2cc');
    case 'primaryDark':
      return colorTheme('#000000', '#b3c2cc');
    case 'primaryTitle':
      return colorTheme('#a2c11c', '#4B721f');
    case 'primaryText':
      return colorTheme('#f5f5f5', '#00021d');
    case 'primaryHover':
      return colorTheme('#1e1177ff', '#99aec4');
    case 'primaryHighlight':
      return colorTheme('#4e1177ff', '#99aec4');

    // Secondary
    case 'secondary':
      return colorTheme('#303030', '#b3c2cc');
    case 'secondaryText':
      return colorTheme('#c0c0c0', '#808b94');
    case 'secondaryHover':
      return colorTheme('#1e1177ff', '#99aec4');
    case 'secondaryHighlight':
      return colorTheme('#252525', '#99aec4');
    case 'secondaryHeader':
      return colorTheme('#353535', '#99aec4');

    // Header
    case 'header':
      return colorTheme('#262932', '#99aec4');
    case 'headerText':
      return colorTheme('#c7c7c7', '#666f78');

    // Footer
    case 'footer':
      return colorTheme('#17191f', '#99aec4');
    case 'footerText':
      return colorTheme('#fefefe', '#666f78');

    // Text
    case 'text':
      return colorTheme('#cecece', '#666f78');
    case 'textHover':
      return colorTheme('#0a7cc2', '#a3b6ff');
    case 'textBackground':
      return colorTheme('#4e448cff', '#666f78');
    case 'textHighlight':
      return colorTheme('#ae7533', '#666f78');
    case 'textEffect':
      return colorTheme('#aeaeae', '#99aec4');

    // Context
    case 'context':
      return colorTheme('#424242', '#666f78');
    case 'contextBackground':
      return colorTheme('#1e1e1e', '#99aec4');

    // Icon
    case 'icon':
      return colorTheme('#909090', '#b3c2cc');
    case 'iconPrimary':
      return colorTheme('#33394f', '#b3c2cc');
    case 'iconSecondary':
      return colorTheme('#03a9f4', '#b3c2cc');
    case 'iconText':
      return colorTheme('#a8a8a8', '#b3c2cc');
    case 'iconHover':
      return colorTheme('#1e354355', '#a3b6ff');
    case 'iconHighlight':
      return colorTheme('#ae7533', '#a3b6ff');

    // Dialog
    case 'border':
      return colorTheme('#fe606060', '#b3c2cc');
    case 'modal':
      return colorTheme('#1e1e1e', '#a3b6ff');
    case 'effect':
      return colorTheme('#08cee6', '#a3b6ff');

    // Card
    case 'card':
      return colorTheme('#141414', '#666666');

    // Gradient
    case 'gradient0':
      return colorTheme('#101010', '#a3a3a3');
    case 'gradient1':
      return colorTheme('#303030', '#b3b3b3');
  }
};

export { color };
