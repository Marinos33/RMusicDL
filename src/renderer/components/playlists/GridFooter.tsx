import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Divider, Typography, useTheme } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { RootState } from '@src/renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';

const GridFooter: React.FC = () => {
  const isResourcesLoaded = useSelector<RootState, { value: boolean; message: string }>(
    (state) => state.ui.isResourcesLoaded
  );
  const theme = useTheme();

  const ProgressBar = React.useCallback(() => {
    if (!isResourcesLoaded.value) {
      return (
        <Box sx={{ width: '10%' }}>
          <Typography variant="subtitle2" color="text.secondary" noWrap align="left">
            {isResourcesLoaded.message}
          </Typography>
          <LinearProgress color="success" sx={{ height: 10, borderRadius: 5 }} />
        </Box>
      );
    }
    return null;
  }, [isResourcesLoaded]);

  return React.useMemo(
    () => (
      <Box style={{ backgroundColor: theme.palette.secondary.main }}>
        <Divider sx={{ border: 1, borderColor: theme.palette.divider }} />
        <Toolbar variant="dense">
          <Box display="flex" flexGrow={1}>
            <div>
              <p>ReactDL</p>
            </div>
          </Box>
          <ProgressBar />
        </Toolbar>
      </Box>
    ),
    [theme, isResourcesLoaded]
  );
};

export default GridFooter;
