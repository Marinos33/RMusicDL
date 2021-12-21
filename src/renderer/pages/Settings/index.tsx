import { Container } from '@mui/material';
import SettingsSideBar from '@src/renderer/components/settings/SideBar';
import React from 'react';
import { hot } from 'react-hot-loader';

const SettingsPage = () => {
  return <Container maxWidth={false} sx={{ overflow: 'hidden' }}><SettingsSideBar /></Container>;
};

export default hot(module)(SettingsPage);
