import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router , RouterStateSnapshot } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private oauthService: OAuthService
    ) { }

    public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
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
