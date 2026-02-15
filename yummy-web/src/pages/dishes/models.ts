export enum DishDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface ICollectionRef {
  id: string;
  name: string;
}

export interface IDish {
  id: string;
  name: string;
  description: string;
  tags: string[];
  difficulty: DishDifficulty;
  mainIngredients: string[];
  collectionIds: string[];
  collections?: ICollectionRef[];
}

export type IDishPayload = Omit<IDish, 'id' | 'collections'>;
