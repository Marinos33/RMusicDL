import React from 'react';
import { hot } from 'react-hot-loader';
import PlaylistsGrid from '@src/renderer/components/playlists/DataTable';
import { Box, Container } from '@mui/material';
import Header from '@src/renderer/components/Header';
import Footer from '@src/renderer/components/Footer';

const PlaylistsPage: React.FC = () => {
  //exemple call main process function
  /* (async () => {
    const res = await window.api.callTest();
    setTest(res);
  })();*/
  return (
    <>
      <Container maxWidth={false}>
        <Header />
        <Box sx={{ pt: 8, pb: 8, mt: 10 }}>
          <PlaylistsGrid />
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default hot(module)(PlaylistsPage);
