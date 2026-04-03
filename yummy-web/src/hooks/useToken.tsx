import useThemeMode from '@components/themeMode/hooks/useThemeMode';
import { ThemeMode } from '@components/themeMode/models';
import {
  _borderSizeToken,
  _colorDarkToken,
  _colorGeneralToken,
  _colorLightToken,
  _fontFamilyToken,
  _fontSizeToken,
  _heightToken,
  _sizeToken,
  type ThemeToken,
} from '@theme/variables';
import { theme } from 'antd';
import { useMemo } from 'react';

function useToken(): ThemeToken {
  const { token } = theme.useToken();
  const { themeMode } = useThemeMode();

  const colorToken = useMemo(() => {
    if (themeMode === ThemeMode.DARK) {
      return _colorDarkToken;
    }

    return _colorLightToken;
  }, [themeMode]);

  return {
    ...token,
    ...colorToken,
    ..._heightToken,
    ..._sizeToken,
    ..._borderSizeToken,
    ..._colorGeneralToken,
    ..._fontSizeToken,
    ..._fontFamilyToken,
  };
}

export default useToken;
