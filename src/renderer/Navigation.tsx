import React from 'react';
import Playlists from './pages/Playlists';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Playlists} exact />
        {/*<Route path="/playlist" component={PlaylistsPageTest} exact />*/}
      </Switch>
    </Router>
  );
};

export default Navigation;
