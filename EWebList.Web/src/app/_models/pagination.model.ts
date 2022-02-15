export interface PaginationModel {
  DisplayLength: number;
  DisplayStart: number;
  Search: string;
  SortCol: string;
  SortDir: 'asc' | 'desc';
  UserId?: number;
  CategoryId?: number;
  SubCategoryId?: number;
}
