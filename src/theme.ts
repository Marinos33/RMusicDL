import { ThemeConfig } from 'antd';

export type ExtentedThemeConfig = ThemeConfig & {
  token: {
    sideBarColor?: string;
    sideBarTriggerColor?: string;
    headerColor?: string;
    colorSecondary?: string;
    drawerColor?: string;
  };
};

export const theme: ExtentedThemeConfig = {
  token: {
    colorBgContainer: '#02183a',
    colorTextBase: '#ffffff',
    colorPrimary: '#145bbf',
    colorSuccess: '#269a0f',
    colorWarning: '#c58911',
    colorError: '#cd1014',
    colorInfo: '#10c2e2',
    colorBorder: '#ffffff',
    colorPrimaryBgHover: '#145bbf',
    // my custom properties
    sideBarColor: '#263566',
    headerColor: '#263566',
    drawerColor: '#263566',
    colorSecondary: '#688eff',
  },
};
