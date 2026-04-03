import { useContext } from 'react';
import ThemeModeContext from '../ThemeContext';

function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }
  return context;
}

export default useThemeMode;
