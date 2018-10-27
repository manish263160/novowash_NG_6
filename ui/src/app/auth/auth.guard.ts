import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router , RouterStateSnapshot } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable()
export class AuthGuard implements CanActivate {

    private nonSecuredUrls = [
        "/app/about-us",
        "/app/faq",
        "/app/home",
        "/app/be-a-partner",
        "/app/privacy-policy",
        "/app/terms-of-use"
    ];

    constructor(
        private router: Router,
        private oauthService: OAuthService
    ) { }

    public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const url: string = state.url;
        const isNonSecuredUrl = this.nonSecuredUrls.indexOf(url) !== -1;
        if (isNonSecuredUrl) {
            return true;
        }
        if (this.oauthService.hasValidIdToken() || this.oauthService.hasValidAccessToken()) {
            return true;
        } else {
            if (this.oauthService.hasValidIdToken() || this.oauthService.hasValidAccessToken()) {
                return true;
            } else {
                console.log("Please log in to access the requested page");
                this.router.navigate(["/app/home"]);
                return false;
            }
        }
    }

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.oauthService.hasValidIdToken() || this.oauthService.hasValidAccessToken()) {
            return true;
        } else {
            if (this.oauthService.hasValidIdToken() || this.oauthService.hasValidAccessToken()) {
                return true;
            } else {
                window.alert("Please log in to access the requested page");
                this.router.navigate(["/app/home"]);
                return false;
            }
        }
    }
}
