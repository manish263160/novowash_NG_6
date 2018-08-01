import { AuthConfig } from "angular-oauth2-oidc";
import { environment } from "../../environments/environment";

const base = document.querySelector("base");
const baseUrl = (base && base.href) || window.location.origin + "/";

export const authConfigPassword: AuthConfig = {

  // Login-Url
  tokenEndpoint: environment.auth.tokenUrl,

  // Url with user info endpoint
  // This endpont is described by OIDC and provides data about the loggin user
  // This sample uses it, because we don't get an id_token when we use the password flow
  // If you don't want this lib to fetch data about the user (e. g. id, name, email) you can skip this line
  // this.oauthService.userinfoEndpoint = "https://steyer-identity-server.azurewebsites.net/identity/connect/userinfo";

  // The SPA's id. Register SPA with this id at the auth-server
  clientId: environment.auth.clientId,

  // set the scope for the permissions the client should request
  scope: "openid profile email voucher",

  // Set a dummy secret
  // Please note that the auth-server used here demand the client to transmit a client secret, although
  // the standard explicitly cites that the password flow can also be used without it. Using a client secret
  // does not make sense for a SPA that runs in the browser. That's why the property is called dummyClientSecret
  // Using such a dummy secret is as safe as using no secret.
  dummyClientSecret: "secret",

  postLogoutRedirectUri: baseUrl + "app/home",
  // URL of the SPA to redirect the user to after login
  redirectUri: baseUrl + "app/home",
  requireHttps: false,
  // Activate Session Checks: (use only for non-ROPC Flow)
  sessionChecksEnabled: true,
  showDebugInformation: true,
  silentRefreshRedirectUri: baseUrl + "app/home",
  // FIXME: use it for debugging only.
  timeoutFactor: environment.production ? 0.75 : 0.01,
  useIdTokenHintForSilentRefresh: true,
};
