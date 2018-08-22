declare const require: any;
export const environment = {
  auth: {
    clientId: "novo-client",
    clientSecret: "novo-secret",
    grantType: "password",
    tokenUrl: "http://13.59.141.30:8080/NovoWash/oauth/token",
    otpUrl: "http://13.59.141.30:8080/NovoWash/login/generateOtp",
  },
  production: true,
  version: require("../../package.json").version,
};
