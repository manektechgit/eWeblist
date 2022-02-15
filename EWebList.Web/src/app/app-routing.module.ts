import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/weblist/home/home.component';
import { SignInComponent } from './components/weblist/sign-in/sign-in.component';
import { SubmitSiteComponent } from './components/weblist/submit-site/submit-site.component';
import { TermsOfServiceComponent } from './components/weblist/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './components/weblist/privacy-policy/privacy-policy.component';
import { DirectoryListComponent } from './components/weblist/directory-list/directory-list.component';
import { CategoryComponent } from './components/weblist/category/category.component';
import { ContactUsComponent } from './components/weblist/contact-us/contact-us.component';
import { ForgetPasswordComponent } from './components/weblist/forget-password/forget-password.component';
import { ResetPaswordComponent } from './components/weblist/reset-pasword/reset-pasword.component';
import { PaymentPageComponent } from './components/weblist/payment-page/payment-page.component';
import { ResetPasswordNewregistrationComponent } from './components/weblist/reset-password-newregistration/reset-password-newregistration.component';


const routes: Routes =
  [
    {
      path: '',
      component: HomeComponent,
      data: { title: 'Get qualified traffic from quality links directory' }
    },
    {
      path: 'home',
      component: HomeComponent,
      data: { title: 'Get qualified traffic from quality links directory' }
    },
    {
      path: 'login',
      component: SignInComponent,
      data: { title: 'Login' }
    },
    {
      path: 'submit-site',
      component: SubmitSiteComponent,
      data: { title: 'Submit Website' }
    },
    {
      path: 'category/:categoryName',
      component: DirectoryListComponent
    },
    {
      path: 'category/:categoryName/:subCategoryName',
      component: DirectoryListComponent
    },
    {
      path: 'category-list',
      component: CategoryComponent,
      data: { title: 'Category' }
    },
    {
      path: 'terms-of-service',
      component: TermsOfServiceComponent,
      data: { title: 'Terms Of Service' }
    },
    {
      path: 'privacy-policy',
      component: PrivacyPolicyComponent,
      data: { title: 'Privacy Policy' }
    },
    {
      path: 'contact-us',
      component: ContactUsComponent,
      data: { title: 'Contact Us' }
    },
    {
      path: 'forget-password',
      component: ForgetPasswordComponent,
      data: { title: 'Forget Password' }
    },
    {
      path: 'reset-password/:userid',
      component: ResetPaswordComponent,
      data: { title: 'Reset Password' }
    },
    {
      path: 'change-password/:userid',
      component: ResetPasswordNewregistrationComponent,
      data: { title: 'Reset Password' }
    },
    {
      path: 'plan',
      component: PaymentPageComponent,
      data: { title: 'Choose Plan' }
    },
    {
      path: 'user',
      loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
    },
    {
      path: '**',
      redirectTo: '/home'
    }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
