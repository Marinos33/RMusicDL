// Render Prop

import React, { useState } from 'react';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import { Box, CircularProgress, IconButton } from '@mui/material';
import PlaylistCard from '../PlaylistCard';
import _ from 'lodash';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const validationSchema = Yup.object().shape({
  url: Yup.string().url('Must be a valid URL').required(),
  playlistFound: Yup.boolean().required(),
  playlistLoading: Yup.boolean().required(),
  folderpath: Yup.string().required()
});

type PropsType = {
  innerRef: any;
};

const AddForm: React.FC<PropsType> = ({ innerRef }) => {
  const [infoPlaylist, setInfoPlaylist] = useState<any>();

  return (
    <Formik
      innerRef={innerRef}
      initialValues={{ url: '', playlistFound: false, playlistLoading: false, folderpath: './' }}
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
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }
        }
      }}
    >
      {({ handleChange, setFieldValue, submitForm, values }) => (
        <Form>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
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
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Field type="text" name="path" autoFocus mode="outlined" disabled fullWidth component={TextField} />
                <IconButton
                  onClick={async () => {
                    const path = await window.electronAPI.selectFolder();
                    setFieldValue('path', path);
                  }}
                >
                  <FolderOpenIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AddForm;
