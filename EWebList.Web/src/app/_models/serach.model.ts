import { SearchBy } from '../_app-constants/app-enum.config';

export interface SearchModel {
  searchBy: SearchBy;
  categoryId: number;
  subCategoryId: number;
  categoryName: string;
  serachText: string;
}
