import { FireOutlined, MehOutlined, QuestionOutlined, SmileOutlined } from '@ant-design/icons';
import type { TFunction } from 'i18next';

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export const getIconByDifficulty = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.EASY:
      return SmileOutlined;
    case Difficulty.MEDIUM:
      return MehOutlined;
    case Difficulty.HARD:
      return FireOutlined;
    default:
      return QuestionOutlined;
  }
};

export const getLabelByDifficulty = (difficulty: Difficulty, t: TFunction) => {
  switch (difficulty) {
    case Difficulty.EASY:
      return t('easy');
    case Difficulty.MEDIUM:
      return t('medium');
    case Difficulty.HARD:
      return t('hard');
    default:
      return difficulty;
  }
};

export const getDifficultyOptions = (t: TFunction) =>
  Object.values(Difficulty).map((difficulty) => ({
    value: difficulty,
    label: getLabelByDifficulty(difficulty, t),
    Icon: getIconByDifficulty(difficulty),
  }));
