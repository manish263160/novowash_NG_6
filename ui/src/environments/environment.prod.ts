import { urlHosts } from "./urlHosts";
// declare const require: any;
export const environment = {
  auth: {
    clientId: "novo-client",
    clientSecret: "novo-secret",
    grantType: "password",
    tokenUrl: `${urlHosts.main}/${urlHosts.appName}/oauth/token`,
    otpUrl: `${urlHosts.main}/${urlHosts.appName}/login/generateOtp`,
  },
  production: true,
  urlHosts: urlHosts,
};
