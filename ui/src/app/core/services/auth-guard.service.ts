import { Injectable } from "@angular/core";
import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    CanActivateChild, 
    Router, 
    RouterStateSnapshot 
} from "@angular/router";
import { UserService } from "./user.service";
import { User } from "../../model/user";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    private user: User;
    private mhTimer: any;

    private nonSecuredUrls = [
        "/home",
    ];

    private childPathsPermissionMapping = {
        "/app/mybookings": [],
        "/app/mybookings/:id": [],
    };
    
    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.user = this.userService.user;
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        console.log("auth-guard.service.canActivate() url: " + url);
        // return this.checkLogin(url);
        return true;
    }

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        console.log("auth-guard.service.canActivateChild() url: " + url);
        // return this.checkLogin(url) && this.checkPermissions(url);
        return true;
    }

    private checkLogin(url: string): boolean {
        if (this.userService.isLoggedIn()) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.userService.redirectUrl = url;

        // Navigate to the login page with extras
        // this.router.navigate(["/login"]);
        return true;
    }

    private checkPermissions(url: string) {
        const childPaths = Object.keys(this.childPathsPermissionMapping);
        for (const path of childPaths) {
            if (url.indexOf(path) !== -1 && this.hasPermissions(this.childPathsPermissionMapping[path])) {
                return true;
            }
        }

        const isNonSecuredUrl = this.nonSecuredUrls.indexOf(url) !== -1;
        if (!isNonSecuredUrl) {
            console.log("auth-guard.service.checkPermissions() no route/permissions found");
            this.router.navigate(["/app/access-denied"]);
        }
        return isNonSecuredUrl;
    }

    private hasPermissions(permissions: string[]) {
        // for (const permission of permissions) {
        //     if (this.user.scopes.indexOf(permission) !== -1) {
        //         return true;
        //     }
        // }
        // return false;
        return true;
    }
}
