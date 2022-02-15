import { FileToUpload } from './flie-upload.model';

export interface UserMasterModel {
  UserId: number;
  Email: string;
  Password: string;
  Title: string;
  RegistrationName: string;
  ProfilePicture: string;
  CountryCode: string;
  ContactNo: string;
  RoleId: number;
  IsActive: boolean;
  ProfileImage?: FileToUpload;
  ModifiedBy?: number;
  IsApproved: boolean;
}
