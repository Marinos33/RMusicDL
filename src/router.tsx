import { createBrowserRouter } from 'react-router-dom';
import Playlists from './Pages/Playlists';
import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'playlists',
        element: <Playlists />,
      },
    ],
  },
]);
