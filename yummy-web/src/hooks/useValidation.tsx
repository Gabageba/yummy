import type { Rule } from 'antd/es/form';
import { useTranslation } from 'react-i18next';

function useValidation() {
  const { t } = useTranslation('validation');

  const required: Rule = {
    message: t('fillField'),
    required: true,
  };

  const isEmail: Rule = {
    message: t('invalidEmailFormat'),
    type: 'email',
  };

  const minLength = (value: number): Rule => ({
    message: t('minLength', { value }),
    min: value,
  });

  return { required, isEmail, minLength };
}

export default useValidation;
