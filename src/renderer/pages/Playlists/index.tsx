import React from 'react';
import { hot } from 'react-hot-loader';
import './index.less';
import PlaylistsGrid from '@src/renderer/components/playlists/DataTable';

const PlaylistsPage: React.FC = () => {
  //exemple call main process function
  /* (async () => {
    const res = await window.api.callTest();
    setTest(res);
  })();*/

  return (
    <React.Fragment>
      <PlaylistsGrid />
    </React.Fragment>
  );
};

export default hot(module)(PlaylistsPage);
