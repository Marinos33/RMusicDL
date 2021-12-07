import React from 'react';
import { hot } from 'react-hot-loader';
import { default as PlaylistsGrid } from '@src/renderer/components/playlists/DataTable';
import { Box, Container } from '@mui/material';
import Header from '@src/renderer/components/Header';
import Footer from '@src/renderer/components/Footer';

const PlaylistsPage: React.FC = () => {
  return (
    <>
      <Container maxWidth={false} sx={{ overflow: 'hidden' }}>
        <Header />
        <Box sx={{ pt: 8, pb: 8, mt: 0.5 }}>
          <PlaylistsGrid />
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default hot(module)(PlaylistsPage);
