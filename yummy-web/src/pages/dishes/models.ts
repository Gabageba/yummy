import type { Difficulty } from '@components/core/fields/difficulty/models';

export interface ICollectionRef {
  id: string;
  name: string;
}

export interface IDish {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  difficulty: Difficulty;
  mainIngredients?: string[];
  collections?: ICollectionRef[];
}

export type IDishPayload = Omit<IDish, 'id' | 'collections'>;
