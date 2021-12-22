//React
import React, { createContext, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';

//Externals
import { THEMES } from '../constants';

interface Settings {
  theme?: string;
}

export interface SettingsContextValue {
  settings: Settings;
  saveSettings: (setting: string, value: any) => void;
}

interface SettingsProviderProps {
  children?: ReactNode;
}

const initialSettings: Settings = {
  theme: THEMES.BLUE
};

export const restoreSettings = async (): Promise<Settings | null> => {
  let settings = null;

  try {
    const storedData: Settings = await window.electronAPI.getStoredSettings('settings');

    if (storedData) {
      settings = storedData;
    } else {
      settings = {
        theme: THEMES.BLUE
      };
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return settings;
};

const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  saveSettings: () => {}
});

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  const restore = async () => {
    const restoredSettings = await restoreSettings();

    if (restoredSettings) {
      setSettings(restoredSettings);
    }
  };

  useEffect(() => {
    restore();
  }, []);

  const saveSettings = async (setting: string, value: any): Promise<void> => {
    await window.electronAPI.updateSettings(setting, value);
    const storedData: Settings = await window.electronAPI.getStoredSettings('settings');
    console.log(storedData);
    const settings = storedData;
    setSettings(settings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
