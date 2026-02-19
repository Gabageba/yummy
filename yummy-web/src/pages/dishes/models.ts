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

export interface IDishPayload extends Omit<IDish, 'id' | 'collections'> {
  collections: string[];
}
