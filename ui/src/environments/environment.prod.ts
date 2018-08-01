declare const require: any;
export const environment = {
  auth: {
    clientId: "web",
    clientSecret: "secret",
    grantType: "password",
    tokenUrl: "http://13.59.141.30:8080/NovoWash/oauth/token",
  },
  production: true,
  version: require("../../package.json").version,
};
