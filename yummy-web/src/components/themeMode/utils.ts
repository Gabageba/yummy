import { ThemeMode } from './models';

const THEME_MODE = 'yummy-theme-mode';

export const setThemeMode = (mode: ThemeMode) => localStorage.setItem(THEME_MODE, mode);

export const getThemeMode = (): ThemeMode => {
  const themeMode = localStorage.getItem(THEME_MODE);
  if (!themeMode) {
    setThemeMode(ThemeMode.LIGHT);
    return ThemeMode.LIGHT;
  }
  return themeMode as ThemeMode;
};

export const removeThemeMode = () => localStorage.removeItem(THEME_MODE);
