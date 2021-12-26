import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Select, TextField } from 'formik-mui';
import * as Yup from 'yup';
import { Box, Button, IconButton, MenuItem, useTheme } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Playlist } from '@src/renderer/types';
import { AVALAIBLE_AUDIO_FORMATS } from '@src/renderer/constants';
import _ from 'lodash';

const validationSchema = Yup.object().shape({
  url: Yup.string().url(),
  folderpath: Yup.string().required(),
  extension: Yup.string().required()
});

type PropsType = {
  playlist: Playlist;
};

const EditForm: React.FC<PropsType> = ({ playlist }) => {
  const theme = useTheme();

  if (playlist === null) {
    return null;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        url: playlist.url,
        folderpath: playlist.downloadingProfile.outputPath,
        extension: playlist.downloadingProfile.outputExtension
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        if (
          values.folderpath !== playlist.downloadingProfile.outputPath ||
          values.extension !== playlist.downloadingProfile.outputExtension
        ) {
          await window.electronAPI.updateProfile(playlist.id, values.extension, values.folderpath);
          setSubmitting(false);
        }
      }}
    >
      {({ setFieldValue, values }) => (
        <Form style={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
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
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, alignItems: 'flex-start' }}>
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
                border: 1,
                ml: 1,
                borderRadius: 1
              }}
              onClick={async () => {
                const path = await window.electronAPI.selectFolder();
                setFieldValue('folderpath', path);
              }}
            >
              <FolderOpenIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
          <Box sx={{ mt: 1 }}>
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
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignContent: 'flex-end',
              mt: 1,
              border: 1,
              borderRadius: 1,
              p: 1,
              borderColor: '#000000'
            }}
          >
            <Button type="reset" sx={{ color: theme.palette.text.secondary }}>
              Cancel
            </Button>
            <Button type="submit" autoFocus variant="contained">
              Save
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EditForm;
