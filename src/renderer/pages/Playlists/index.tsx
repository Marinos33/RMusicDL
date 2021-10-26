import React from 'react';
import { hot } from 'react-hot-loader';
import Grid from '@mui/material/Grid';
import PlaylistsGrid from '@src/renderer/components/playlists/DataTable';
import { Box, Container, Paper, styled } from '@mui/material';

const PlaylistsPage: React.FC = () => {
  //exemple call main process function
  /* (async () => {
    const res = await window.api.callTest();
    setTest(res);
  })();*/
  const Item = styled(Paper)(({ theme }: any) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));
  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <Box sx={{ mt: 3 }}>
          <Grid container>
            <Grid item xs={12}>
              <PlaylistsGrid />
            </Grid>
            {/*<Grid item xs={12}>
              <Item>3</Item>
            </Grid>
            <Grid item xs={12}>
              <Item>400</Item>
  </Grid>*/}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default hot(module)(PlaylistsPage);
