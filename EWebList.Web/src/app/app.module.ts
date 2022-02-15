import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiPrefixInterceptor } from './_interceptors/api-prefix.interceptor';
import { allServices } from './_services';
import { allNonLoginComponents } from './components/weblist';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderInterceptor } from './_interceptors/loader.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';
import { FilterSubCategoryPipe } from './pipes/filter-sub-category.pipe';
import { TitleService } from './_services/title.service';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { CategoryComponent } from './components/weblist/category/category.component';
import { ContactUsComponent } from './components/weblist/contact-us/contact-us.component';
import { ChartsModule } from 'ng2-charts';
import { ForgetPasswordComponent } from './components/weblist/forget-password/forget-password.component';
import { ResetPaswordComponent } from './components/weblist/reset-pasword/reset-pasword.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageCompressService } from 'ngx-image-compress';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaymentPageComponent } from './components/weblist/payment-page/payment-page.component';
import { ResetPasswordNewregistrationComponent } from './components/weblist/reset-password-newregistration/reset-password-newregistration.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ...allNonLoginComponents,
    LoaderComponent,
    FilterSubCategoryPipe,
    CategoryComponent,
    ContactUsComponent,
    ForgetPasswordComponent,
    ResetPaswordComponent,
    PaymentPageComponent,
    ResetPasswordNewregistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({

    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ...allServices,
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(titleService: TitleService) {
    titleService.init();
  }
}
