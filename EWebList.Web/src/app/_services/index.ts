import { AuthenticationService } from './authentication.service';
import { CategoryMasterService } from './categorymaster.service';
import { SubCategoryMasterService } from './sub-categorymaster.service';
import { DirectoryMasterService } from './directorymaster.service';
import { LoaderService } from './loader.service';
import { TitleService } from './title.service';
import { UserMasterService } from './user-master.service';
import { AlertService } from './alert.service';
import { CountryCodeService } from './country-code.service';
import { DropdownListItemService } from './dropdown-list-item.service';
import { ContactUsService } from './contact-us.service';
import { DirectoryClickService } from './directory-click.service';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { UserSettingService } from './user-setting.service';
import { EmailSubscriptionService } from './email-subscription.service';
import { EmailValidationService } from './email-validation.service';
import { LoggerServiceService } from './logger-service.service';

export const allServices = [
  AuthenticationService,
  CategoryMasterService,
  SubCategoryMasterService,
  DirectoryMasterService,
  UserMasterService,
  LoaderService,
  TitleService,
  AlertService,
  CountryCodeService,
  DropdownListItemService,
  ContactUsService,
  DirectoryClickService,
  ConfirmationDialogService,
  UserSettingService,
  EmailSubscriptionService,
  EmailValidationService,
  LoggerServiceService
];
