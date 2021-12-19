// Render Prop

import React, { useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import { Select, TextField } from 'formik-mui';
import * as Yup from 'yup';
import { Box, Button, IconButton, MenuItem, useTheme } from '@mui/material';
import _ from 'lodash';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useDispatch, useSelector } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import useWindowDimensions from '@src/renderer/hooks/useWindowDimensions';
import { RootState } from '@src/renderer/redux/reducers/rootReducer';
import { Playlist } from '@src/renderer/types';
import { setPlaylist } from '@src/renderer/redux/playlist/actionCreators';

const validationSchema = Yup.object().shape({
  url: Yup.string().url(),
  folderpath: Yup.string().required(),
  extension: Yup.string().required()
});

const SideBar: React.FC = () => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  const playlist = useSelector<RootState, Playlist>((state) => state.playlist.selectedPlaylist);
  const dispatch = useDispatch();
  console.log(playlist);

  const styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: theme.palette.background.paper
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: theme.palette.primary.main
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: theme.palette.secondary.main,
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

  return useMemo(
    () => (
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
        <Formik
          initialValues={{
            url: playlist?.url || '',
            folderpath: playlist?.profile?.outputPath || '',
            extension: playlist?.profile?.outputExtension || ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
            console.log(values);
          }}
        >
          {({ handleChange, setFieldValue, submitForm, values, resetForm }) => (
            <Form>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', m: 1 }}>
                <Field
                  type="text"
                  name="url"
                  autoFocus
                  mode="outlined"
                  value={values.url}
                  disabled
                  fullWidth
                  component={TextField}
                />
              </Box>

              <>
                <Box sx={{ display: 'flex', flexDirection: 'row', m: 1, p: 1, alignItems: 'flex-start' }}>
                  <Field
                    type="text"
                    name="folderpath"
                    value={values.folderpath}
                    mode="outlined"
                    disabled
                    fullWidth
                    component={TextField}
                  />
                  <IconButton
                    sx={{
                      alignSelf: 'center',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1,
                      ml: 1
                    }}
                    onClick={async () => {
                      const path = await window.electronAPI.selectFolder();
                      setFieldValue('folderpath', path);
                    }}
                  >
                    <FolderOpenIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Box>
                <Field
                  type="text"
                  name="extension"
                  autoFocus
                  mode="outlined"
                  value={values.extension}
                  fullWidth
                  component={Select}
                >
                  <MenuItem value={'aac'}>AAC</MenuItem>
                  <MenuItem value={'alac'}>ALAC</MenuItem>
                  <MenuItem value={'flac'}>FLAC</MenuItem>
                  <MenuItem value={'m4a'}>M4A</MenuItem>
                  <MenuItem value={'mp3'}>MP3</MenuItem>
                  <MenuItem value={'opus'}>OPUS</MenuItem>
                  <MenuItem value={'vorbis'}>VORBIS</MenuItem>
                  <MenuItem value={'wav'}>WAV</MenuItem>
                </Field>
              </>
              <Button type="reset">Cancel</Button>
              <Button type="submit" autoFocus variant="contained">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Menu>
    ),
    [playlist]
  );
};

export default SideBar;
