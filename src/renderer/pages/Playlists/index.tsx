import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import logo from '@assets/images/logo.png';
import './index.less';
import { useHistory } from 'react-router-dom';

const PlaylistsPage: React.FC = () => {
  //exemple call main process function
  /* (async () => {
    const res = await window.api.callTest();
    setTest(res);
  })();*/

  return (
    <React.Fragment>
      <p>in progress</p>
    </React.Fragment>
  );
};

export default hot(module)(PlaylistsPage);
