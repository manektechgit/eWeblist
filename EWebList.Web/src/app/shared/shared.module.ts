import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { DragNDropDirective } from './drag-n-drop.directive';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ImageUploadProgressComponent } from './image-upload-progress/image-upload-progress.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '../_services/confirmation-dialog.service';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { CountryCodeComponent } from './country-code/country-code.component';
import { PaymentSharedComponent } from './payment-shared/payment-shared.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { TextCountDirective } from './text-count-directive.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPayPalModule
  ],
  declarations: [
    SearchbarComponent,
    AlertComponent,
    DragNDropDirective,
    ContactFormComponent,
    ImageUploadProgressComponent,
    ConfirmationDialogComponent,
    PasswordStrengthComponent,
    CountryCodeComponent,
    PaymentSharedComponent,
    TextCountDirective
  ],
  exports: [
    SearchbarComponent,
    AlertComponent,
    DragNDropDirective,
    ContactFormComponent,
    ImageUploadProgressComponent,
    ConfirmationDialogComponent,
    PasswordStrengthComponent,
    CountryCodeComponent,
    PaymentSharedComponent
  ],
  providers: [],
})
export class SharedModule { }
