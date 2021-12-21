import React from 'react';
import Playlists from './pages/Playlists';
import SettingsPage from './pages/Settings';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import RouteSideBar from './components/RouteSideBar';

const Navigation: React.FC = () => {
  return (
    <Router>
      <div className="App" id="outer-container">
        <RouteSideBar />
        <Switch>
          <div id="page-wrap">
            <Route path="/" component={Playlists} exact />
            <Route path="/settings" component={SettingsPage} exact />
          </div>
        </Switch>
      </div>
    </Router>
  );
};

export default Navigation;
