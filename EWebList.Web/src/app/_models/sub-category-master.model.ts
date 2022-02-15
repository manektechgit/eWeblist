import { FileToUpload } from './flie-upload.model';

export interface SubCategoryMasterModel {
  SubCategoryId: number;
  CategoryId: number;
  Name: string;
  IconName: string;
  CreatedBy: number;
  CreatedDate?: Date;
  ModifiedBy?: number;
  ModifiedDate?: Date;
  IsActive: boolean;
  CategoryImage?: FileToUpload;
  SlugName?: string;
}
