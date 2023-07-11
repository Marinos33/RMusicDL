import React from 'react';
import { BridgeContext } from '../context/bridgeContext';

const useBridge = () => React.useContext(BridgeContext);

export default useBridge;
