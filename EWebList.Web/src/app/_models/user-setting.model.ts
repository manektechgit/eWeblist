export interface UserSettingModel {
  UserId: number;
  Name: string;
  SettingId: number;
  SettingValue: boolean;
  CreatedBy: number;
  CreatedDate: Date;
  ModifiedBy: number;
  ModifiedDate: Date;
  Active: boolean;
}
