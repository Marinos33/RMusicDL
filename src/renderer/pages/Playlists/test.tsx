//THIS PAGE CONTAIN THE WAY TO DO ROUTE NAVIGATION !!!!

import React from 'react';
import { hot } from 'react-hot-loader';
import { useHistory } from 'react-router-dom';

const PlaylistsPageTest: React.FC = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <main>
        <div className="center">
          <button onClick={() => history.push('playlist')}>
            Increment Counter <span>Navigate</span>
          </button>
        </div>
      </main>
    </React.Fragment>
  );
};

export default hot(module)(PlaylistsPageTest);
