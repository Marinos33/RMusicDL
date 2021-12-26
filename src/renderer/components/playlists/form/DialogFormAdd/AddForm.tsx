import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Select, TextField } from 'formik-mui';
import * as Yup from 'yup';
import { Box, Button, CircularProgress, DialogActions, IconButton, MenuItem, useTheme } from '@mui/material';
import _ from 'lodash';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useDispatch } from 'react-redux';
import { addPlaylist } from '@src/renderer/redux/playlist/actionCreators';
import PlaylistCard from '../../PlaylistCard';
import { AVALAIBLE_AUDIO_FORMATS } from '@src/renderer/constants';

const validationSchema = Yup.object().shape({
  url: Yup.string().url('Must be a valid URL').required(),
  folderpath: Yup.string().required(),
  extension: Yup.string().required()
});

type PropsType = {
  onClose: () => void;
};

const AddForm: React.FC<PropsType> = ({ onClose }) => {
  const [infoPlaylist, setInfoPlaylist] = useState<never>();
  const [playlistFound, setPlaylistFound] = useState<boolean>(false);
  const [playlistLoading, setPlaylistLoading] = useState<boolean>(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const findPlaylist = async (url: string): Promise<boolean> => {
    setPlaylistLoading(true);
    const info = await window.electronAPI.getInfoPlaylist(url);
    if (info) {
      setPlaylistFound(true);
      setInfoPlaylist(info);
      setPlaylistLoading(false);
      return true;
    }
    setPlaylistLoading(false);
    return false;
  };

  return (
    <Formik
      initialValues={{
        url: '',
        folderpath: './',
        extension: 'mp3'
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (playlistFound && infoPlaylist) {
          dispatch(
            addPlaylist(
              values.url,
              infoPlaylist['uploader'],
              infoPlaylist['title'],
              values.extension,
              values.folderpath
            )
          );
          resetForm();
          setPlaylistLoading(false);
          setPlaylistFound(false);
          onClose();
          setSubmitting(false);
        }
      }}
    >
      {({ handleChange, setFieldValue, values, resetForm, setFieldError }) => (
        <Form>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', m: 1 }}>
            <Field
              type="text"
              name="url"
              autoFocus
              mode="outlined"
              value={values.url}
              disabled={playlistLoading}
              fullWidth
              component={TextField}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                setTimeout(async () => {
                  const found = await findPlaylist(e.target.value);
                  if (!found) {
                    setFieldError('url', 'this playlist either not exists or is private');
                  }
                }, 1000);
              }}
            />
            {playlistLoading && <CircularProgress sx={{ ml: 3 }} />}
          </Box>
          {infoPlaylist && playlistFound && (
            <>
              <PlaylistCard
                title={infoPlaylist['title']}
                thumbnail={_.flatMap(infoPlaylist['entries'], 'thumbnail')[0]}
                author={infoPlaylist['uploader']}
                contentTitles={_.flatMap(infoPlaylist['entries'], 'title')}
                authorURL={infoPlaylist['uploader_url']}
              />
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
                {_.sortBy(AVALAIBLE_AUDIO_FORMATS).map((format, index) => (
                  <MenuItem value={format} key={index}>
                    {format.toUpperCase()}
                  </MenuItem>
                ))}
              </Field>
            </>
          )}
          <DialogActions>
            <Button
              onClick={() => {
                onClose();
                resetForm();
                setPlaylistLoading(false);
                setPlaylistFound(false);
              }}
              type="reset"
              sx={{ color: theme.palette.text.secondary }}
            >
              Cancel
            </Button>
            <Button type="submit" autoFocus variant="contained" disabled={playlistLoading || !playlistFound}>
              Submit
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default AddForm;
