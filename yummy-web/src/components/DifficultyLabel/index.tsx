import type { Difficulty } from '@components/core/fields/difficulty/models';
import {
  getIconByDifficulty,
  getLabelByDifficulty,
} from '@components/core/fields/difficulty/models';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import useToken from '@hooks/useToken';
import './index.scss';

interface IProps {
  difficulty: Difficulty;
}

function DifficultyLabel({ difficulty }: IProps) {
  const { t } = useTranslation();
  const token = useToken();
  const Icon = getIconByDifficulty(difficulty);

  return (
    <Flex
      gap={token.marginXXS}
      align="center"
      className={`difficulty-label difficulty-label__${difficulty}`}
    >
      <Icon />
      {t('difficultyLabel', { difficulty: getLabelByDifficulty(difficulty, t) })}
    </Flex>
  );
}

export default DifficultyLabel;
