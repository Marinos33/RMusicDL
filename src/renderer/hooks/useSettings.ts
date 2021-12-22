//React
import { useContext } from 'react';
//Externals
import SettingsContext from '../contexts/SettingsContext';
import type { SettingsContextValue } from '../contexts/SettingsContext';

const useSettings = (): SettingsContextValue => useContext(SettingsContext);

export default useSettings;
