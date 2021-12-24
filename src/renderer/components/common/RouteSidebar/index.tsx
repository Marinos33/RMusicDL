import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useDispatch } from 'react-redux';
import { setSideBarCollapsed } from '../../../redux/ui/actionCreators';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const RouteSideBar: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

  return useMemo(
    () => (
      <SideNav
        style={{ backgroundColor: theme.palette.sideBar.backgroundColor.primary, borderColor: theme.palette.divider }}
        onSelect={(selected: string) => {
          const to = '/' + selected;
          if (location.pathname !== to) {
            history.push(to);
          }
        }}
        onToggle={(toggled: boolean) => {
          dispatch(setSideBarCollapsed(!toggled));
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="playlists">
          <NavItem eventKey="playlists">
            <NavIcon style={{ color: 'red' }}>
              <LibraryMusicIcon sx={{ mb: 0.3, color: theme.palette.icon.primary }} />
            </NavIcon>
            <NavText>
              <Typography variant="h6" color="text.primary">
                Playlists
              </Typography>
            </NavText>
          </NavItem>
          <NavItem eventKey="settings">
            <NavIcon>
              <SettingsIcon sx={{ mb: 0.4, color: theme.palette.icon.primary }} />
            </NavIcon>
            <NavText>
              <Typography variant="h6" color="text.primary">
                Settings
              </Typography>
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    ),
    [theme]
  );
};

export default RouteSideBar;
