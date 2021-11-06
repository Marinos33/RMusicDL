// Render Prop

import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import { Box, CircularProgress } from '@mui/material';

const validationSchema = Yup.object().shape({
  url: Yup.string().url('Must be a valid URL').required(),
  playlistFound: Yup.boolean().required(),
  playlistLoading: Yup.boolean().required()
});

type PropsType = {
  innerRef: any;
};

const AddForm: React.FC<PropsType> = ({ innerRef }) => {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={{ url: '', playlistFound: false, playlistLoading: false }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setFieldValue, setFieldError }) => {
        console.log('submit');

        if (!values.playlistFound) {
          setTimeout(async () => {
            setFieldValue('playlistLoading', true);
            const info = await window.electronAPI.getInfoPlaylist(values.url);
            if (info) {
              setFieldValue('playlistFound', true);
              console.log(JSON.stringify(info, null, 2));
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
        </Form>
      )}
    </Formik>
  );
};

export default AddForm;
