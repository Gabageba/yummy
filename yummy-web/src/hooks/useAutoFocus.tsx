import type { FormInstance } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import { useCallback } from 'react';

function useAutoFocus(fieldName: NamePath, form: FormInstance) {
  const afterOpenChange = useCallback(
    (opened: boolean) => {
      if (!opened) return;
      requestAnimationFrame(() => {
        form.getFieldInstance(fieldName)?.focus?.();
      });
    },
    [form, fieldName],
  );

  return { afterOpenChange };
}

export default useAutoFocus;
