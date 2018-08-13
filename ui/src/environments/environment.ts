// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

declare const require: any;
export const environment = {
  auth: {
    clientId: "novo-client",
    clientSecret: "novo-secret",
    grantType: "password",
    tokenUrl: "http://13.59.141.30:8080/NovoWash/oauth/token",
    otpUrl: "http://13.59.141.30:8080/NovoWash/login/generateOtp",
  },
  production: false,
  version: require("../../package.json").version,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
