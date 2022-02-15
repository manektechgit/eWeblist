import { FileToUpload } from './flie-upload.model';

export interface CategoryMasterModel {
  CategoryId: number;
  Name: string;
  IconName: string;
  CreatedBy: number;
  CreatedDate?: Date;
  ModifyBy?: number;
  ModifiedDate?: Date;
  IsActive: boolean;
  CategoryImage?: FileToUpload;
  SlugName?: string;
}
