import { JwksValidationHandler, OAuthService } from "angular-oauth2-oidc";
import { authConfigPassword } from "./oauth.config";
import { AuthorizationErrorResponse } from "./oauth.errors";

export function initializeAuth(oauthService: OAuthService) {
  oauthService.setStorage(localStorage);
  oauthService.configure(authConfigPassword);
  oauthService.tokenValidationHandler = new JwksValidationHandler();

  return async () => {
    // await oauthService.loadDiscoveryDocumentAndTryLogin({
    //   onLoginError: (err: AuthorizationErrorResponse) => {
    //     console.log(`Error Code: ${err.error}, Error Description: ${err.error_description}`);
    //   },
    // });
    if (oauthService.hasValidAccessToken()) {
      // This is called when using ImplicitFlow or page reload, no effect for ROPC Flow
      const profile: any = oauthService.getIdentityClaims();
      if (profile) {
        profile.redirectUrl = window.location.pathname;
        oauthService.setupAutomaticSilentRefresh();
      }
    }
    return true; // need to return.
  };
}
