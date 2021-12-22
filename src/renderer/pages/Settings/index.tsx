import { Container } from '@mui/material';
import SectionContainer from '@src/renderer/components/settings/SectionContainer';
import { RootState } from '@src/renderer/redux/reducers/rootReducer';
import React from 'react';
import { hot } from 'react-hot-loader';
import { useSelector } from 'react-redux';

const SettingsPage = () => {
  const collapsed = useSelector<RootState, boolean>((state) => state.ui.IsSideBarCollapsed);
  return (
    <Container maxWidth={false} sx={{ overflow: 'hidden', ml: collapsed ? 5 : 27 }}>
      <SectionContainer />
    </Container>
  );
};

export default hot(module)(SettingsPage);
