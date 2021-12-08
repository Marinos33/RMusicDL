// Render Prop

import React, { useState } from 'react';

import { Formik, Form, Field } from 'formik';
import { Select, TextField } from 'formik-mui';
import * as Yup from 'yup';
import { Box, CircularProgress, IconButton, MenuItem, useTheme } from '@mui/material';
import PlaylistCard from '../PlaylistCard';
import _ from 'lodash';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useDispatch } from 'react-redux';
import { addPlaylist } from '@src/renderer/redux/playlist/actionCreators';

const validationSchema = Yup.object().shape({
  url: Yup.string().url('Must be a valid URL').required(),
  playlistFound: Yup.boolean().required(),
  playlistLoading: Yup.boolean().required(),
  folderpath: Yup.string().required(),
  extension: Yup.string().required()
});

type PropsType = {
  innerRef: any;
};

const AddForm: React.FC<PropsType> = ({ innerRef }) => {
  const [infoPlaylist, setInfoPlaylist] = useState<any>();
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Formik
      innerRef={innerRef}
      initialValues={{ url: '', playlistFound: false, playlistLoading: false, folderpath: './', extension: 'mp3' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setFieldValue, setFieldError }) => {
        if (!values.playlistLoading) {
          if (!values.playlistFound) {
            setTimeout(async () => {
              setFieldValue('playlistLoading', true);
              const info = await window.electronAPI.getInfoPlaylist(values.url);
              if (info) {
                setFieldValue('playlistFound', true);
                setInfoPlaylist(info);
              } else {
                setFieldError('url', 'playlist not found');
              }
              setSubmitting(false);
              setFieldValue('playlistLoading', false);
            }, 500);
          } else {
            dispatch(
              addPlaylist(
                values.url,
                infoPlaylist['uploader'],
                infoPlaylist['title'],
                values.extension,
                values.folderpath
              )
            );
            setSubmitting(false);
          }
        }
      }}
    >
      {({ handleChange, setFieldValue, submitForm, values }) => (
        <Form>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', m: 1 }}>
            <Field
              type="text"
              name="url"
              autoFocus
              mode="outlined"
              disabled={values.playlistLoading}
              fullWidth
              component={TextField}
              onChange={(e: Event) => {
                handleChange(e);
                setTimeout(async () => {
                  setFieldValue('playlistFound', false);
                  submitForm();
                }, 500);
              }}
            />
            {values.playlistLoading && <CircularProgress sx={{ ml: 3 }} />}
          </Box>
          {infoPlaylist && (
            <>
              <PlaylistCard
                title={infoPlaylist['title']}
                thumbnail={_.flatMap(infoPlaylist['entries'], 'thumbnail')[0]}
                author={infoPlaylist['uploader']}
                contentTitles={_.flatMap(infoPlaylist['entries'], 'title')}
                authorURL={infoPlaylist['uploader_url']}
              />
              <Box sx={{ display: 'flex', flexDirection: 'row', m: 1, p: 1, alignItems: 'flex-start' }}>
                <Field type="text" name="folderpath" mode="outlined" disabled fullWidth component={TextField} />
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
              <Field type="text" name="extension" autoFocus mode="outlined" fullWidth component={Select}>
                <MenuItem value={'mp3'}>MP3</MenuItem>
                <MenuItem value={'wav'}>WAV</MenuItem>
                <MenuItem value={'flac'}>FLAC</MenuItem>
                <MenuItem value={'m4a'}>M4A</MenuItem>
                <MenuItem value={'opus'}>OPUS</MenuItem>
                <MenuItem value={'vorbis'}>VORBIS</MenuItem>
              </Field>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AddForm;
