import { Role } from '../_app-constants/app-enum.config';

export interface LoginResponseModel {
  UserId: number;
  Email: string;
  Password: string;
  Title: string;
  RegistrationName: string;
  ProfilePicture: string;
  ContactNo: string;
  RoleId: Role;
  IsActive: boolean;
  IsLocalStorage: boolean;
  JwtToken: string;
}
