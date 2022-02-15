// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:41347/api/',
  categoryImagePath: 'http://localhost:41347/category_images/',
  subCategoryImagePath: 'http://localhost:41347/subcategory_images/',
  directoryImagePath: 'http://localhost:41347/directory_images/',
  userImagePath: 'http://localhost:41347/user_images/',
  currentHostAddress: 'http://localhost:4200/',
  paypal_clientId: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
