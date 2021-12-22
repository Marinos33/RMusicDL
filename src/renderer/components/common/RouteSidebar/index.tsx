import React, { FC, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu';
import { IconButton, Typography, useTheme } from '@mui/material';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import SettingsIcon from '@mui/icons-material/Settings';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers/rootReducer';
import { setSideBarCollapsed } from '../../../redux/ui/actionCreators';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from './Styled/StyledSideNav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const RouteSideBar: FC = () => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  const collapsed = useSelector<RootState, boolean>((state) => state.ui.IsSideBarCollapsed);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <SideNav
      style={{ backgroundColor: theme.palette.background.paper, borderColor: theme.palette.divider }}
      onSelect={(selected: string) => {
        const to = '/' + selected;
        if (location.pathname !== to) {
          history.push(to);
        }
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="playlists">
        <NavItem eventKey="playlists">
          <NavIcon>
            <LibraryMusicIcon sx={{ mb: 0.3 }} />
          </NavIcon>
          <NavText>
            <Typography variant="h6" color="text.primary">
              Playlists
            </Typography>
          </NavText>
        </NavItem>
        <NavItem eventKey="settings">
          <NavIcon>
            <SettingsIcon sx={{ mb: 0.4 }} />
          </NavIcon>
          <NavText>
            <Typography variant="h6" color="text.primary">
              Settings
            </Typography>
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );

  /*const styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '25px',
      height: '25px',
      left: '15px',
      top: '15px'
    },
    bmBurgerBars: {
      background: theme.palette.primary.main
    },
    bmBurgerBarsHover: {
      background: theme.palette.primary.contrastText
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: 'transparent'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: theme.palette.background.paper,
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'flex',
      textDecoration: 'none',
      marginBottom: '10px',
      color: theme.palette.primary.contrastText,
      transition: 'color 0.2s'
    }
  };

  return (
    <Menu
      isOpen
      onClose={() => null}
      pageWrapId={'page-wrap'}
      outerContainerId={'outer-container'}
      styles={styles}
      width={height > width ? (collapsed ? '10%' : '20%') : collapsed ? '5%' : '10%'}
      noOverlay
      disableCloseOnEsc
      disableOverlayClick
      disableAutoFocus
      customBurgerIcon={false}
    >
      <IconButton onClick={() => dispatch(setSideBarCollapsed(!collapsed))}>
        <MenuIcon />
      </IconButton>
      <Link className="menu-item" to="/">
        <LibraryMusicIcon />
        {collapsed === false && 'Playlists'}
      </Link>
      <Link className="menu-item" to="/Settings">
        <SettingsIcon />
        {collapsed === false && 'Settings'}
      </Link>
    </Menu>
  );*/
};

export default RouteSideBar;
