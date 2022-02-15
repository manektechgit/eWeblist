import { FileToUpload } from './flie-upload.model';

export interface DirectoryMasterModel {
  DirectoryId?: number;
  UserId?: number;
  CategoryId: number;
  SubCategoryId: number;
  BusinessName: string;
  WebsiteUrl: string;
  Logo: string;
  ListingHeadline: string;
  Keywords: string;
  Description: string;
  IsDeleted: boolean;
  CreatedDate: Date;
  DirectoryImage?: FileToUpload;
  IsPremium?: boolean;
  ExpireDate?: Date;
  IsExpired?: boolean;
  IsActive?: boolean;
}
