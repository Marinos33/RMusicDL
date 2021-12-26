import React from 'react';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import useWindowDimensions from '@src/renderer/hooks/useWindowDimensions';
import { RootState } from '@src/renderer/redux/reducers/rootReducer';
import { Playlist } from '@src/renderer/types';
import { setPlaylist } from '@src/renderer/redux/playlist/actionCreators';
import EditForm from './EditForm';

const SideBar: React.FC = () => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  const playlist = useSelector<RootState, Playlist>((state) => state.playlist.selectedPlaylist);
  const dispatch = useDispatch();

  const styles = React.useMemo(() => {
    return {
      bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '36px'
      },
      bmBurgerBars: {
        background: theme.palette.primary.contrastText
      },
      bmBurgerBarsHover: {
        background: '#a90000'
      },
      bmCrossButton: {
        height: '24px',
        width: '24px'
      },
      bmCross: {
        background: theme.palette.primary.contrastText
      },
      bmMenuWrap: {
        position: 'fixed',
        height: '100%'
      },
      bmMenu: {
        background: theme.palette.sideBar.backgroundColor.primary,
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
        display: 'inline-block'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
      }
    };
  }, []);

  if (playlist === null) {
    return null;
  }

  return (
    <Menu
      right
      isOpen={playlist !== null}
      styles={styles}
      width={height > width ? '40%' : '30%'}
      disableCloseOnEsc
      noOverlay
      disableOverlayClick
      customBurgerIcon={false}
      onClose={() => dispatch(setPlaylist())}
    >
      <EditForm playlist={playlist} />
    </Menu>
  );
};

export default SideBar;
