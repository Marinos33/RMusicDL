import { ThemeConfig } from 'antd';

export type ExtentedThemeConfig = ThemeConfig & {
  token: {
    sideBarColor?: string;
    sideBarTriggerColor?: string;
  };
};

export const theme: ExtentedThemeConfig = {
  token: {
    colorBgBase: '#1d252f',
    colorTextBase: '#ffffff',
    colorPrimary: '#145bbf',
    colorSuccess: '#269a0f',
    colorWarning: '#c58911',
    colorError: '#cd1014',
    colorInfo: '#10c2e2',
    colorBorder: '#ffffff',
    // my custom properties
    sideBarColor: '#263566',
    sideBarTriggerColor: '#145bbf',
  },
};
