import type { PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { ThemeMode } from './models';
import { getThemeMode, setThemeMode } from './utils';
import ThemeModeContext from './ThemeContext';

interface IProps extends PropsWithChildren {}

function ThemeModeProvider({ children }: IProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getThemeMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-yummy-theme', themeMode);
  }, [themeMode]);

  const handleSetThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    setThemeMode(mode);
  };

  const value = useMemo(
    () => ({
      themeMode,
      setThemeMode: handleSetThemeMode,
    }),
    [themeMode],
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export default ThemeModeProvider;
