import React from 'react';
import Playlists from './pages/Playlists';
import SettingsPage from './pages/Settings';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import RouteSideBar from './components/common/RouteSidebar';

const Navigation: React.FC = () => {
  return (
    <Router>
      <div>
        <RouteSideBar />
        <Switch>
          <div>
            <Route exact path="/">
              <Redirect to="/playlists" />
            </Route>
            <Route path="/playlists" component={Playlists} exact />
            <Route path="/settings" component={SettingsPage} exact />
          </div>
        </Switch>
      </div>
    </Router>
  );
};

export default Navigation;
