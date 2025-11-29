import type { IFormError } from '@customTypes/errors';
import type { FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';

function useApiValidationErrors(form: FormInstance) {
  const { t } = useTranslation('validation');

  const handleValidationErrors = (error: IFormError) => {
    const messages = error?.data ?? [];
    const fieldErrors: Record<string, string[]> = {};

    messages.forEach(({ field, codes }) => {
      if (!fieldErrors[field]) fieldErrors[field] = [];

      codes.forEach(({ code, value }) => {
        fieldErrors[field].push(value ? t(code, { value }) : t(code));
      });
    });

    form.setFields(
      Object.entries(fieldErrors).map(([name, errors]) => ({
        name,
        errors,
      })),
    );
  };

  return { handleValidationErrors };
}

export default useApiValidationErrors;
