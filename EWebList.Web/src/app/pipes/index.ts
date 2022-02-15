import { FilterCategoryPipe } from './filter-category.pipe';
import { FilterSubCategoryPipe } from './filter-sub-category.pipe';
import { FilterCategorySubCategoryPipe } from './filter-category-sub-category.pipe';
import { SlugifyPipe } from './slugify.pipe';
import { DeSlugifyPipe } from './de-slugify.pipe';

export const allPipes = [
  FilterCategoryPipe,
  FilterSubCategoryPipe,
  FilterCategorySubCategoryPipe,
  SlugifyPipe,
  DeSlugifyPipe
];
