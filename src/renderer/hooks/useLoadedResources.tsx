import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchPlaylists } from '../redux/playlist/actionCreators';

export default function useLoadedResources() {
  const dispatch = useDispatch();
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        /*// Load images
        await Asset.loadAsync([
          images.curve,
          images.history,
          images.parking,
          images.markeriOS,
          images.markerAndroid
        ] as string[]);

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf')
        });*/
        dispatch(fetchPlaylists());
      } catch (e) {
        // We might want to provide this error information to an error reporting services
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
