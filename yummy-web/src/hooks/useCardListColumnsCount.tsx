import { Grid } from 'antd';
import { useMemo } from 'react';

function useCardListColumnsCount() {
  const screens = Grid.useBreakpoint();

  const columnsCount = useMemo(() => {
    if (!screens.md) {
      return 1;
    }
    if (!screens.xl) {
      return 2;
    }
    if (!screens.xxl) {
      return 3;
    }
    return 4;
  }, [screens]);

  return columnsCount;
}

export default useCardListColumnsCount;
