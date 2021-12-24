import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchPlaylists } from '../redux/playlist/actionCreators';

export default function useLoadedResources(): boolean {
  const dispatch = useDispatch();
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        dispatch(fetchPlaylists());
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
    /*setTimeout(() => {
      loadResourcesAndDataAsync();
    }, 5000);*/
  }, []);

  return isLoadingComplete;
}
