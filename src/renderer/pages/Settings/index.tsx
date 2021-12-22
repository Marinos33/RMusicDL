import { Container } from '@mui/material';
import CustomizedAccordions from '@src/renderer/components/settings/SectionContainer';
import useWindowDimensions from '@src/renderer/hooks/useWindowDimensions';
import { RootState } from '@src/renderer/redux/reducers/rootReducer';
import React from 'react';
import { hot } from 'react-hot-loader';
import { useSelector } from 'react-redux';

const SettingsPage = () => {
  const collapsed = useSelector<RootState, boolean>((state) => state.ui.IsSideBarCollapsed);
  const { height, width } = useWindowDimensions();
  return (
    <Container maxWidth={false} sx={{ overflow: 'hidden', ml: collapsed ? 5 : 27, width: width - 16 }}>
      <CustomizedAccordions />
    </Container>
  );
};

export default hot(module)(SettingsPage);
