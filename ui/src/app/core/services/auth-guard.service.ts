import { Injectable } from "@angular/core";
import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    CanActivateChild, 
    Router, 
    RouterStateSnapshot 
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    
    constructor(private router: Router) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        console.log("auth-guard.service.canActivate() url: " + url);
        return true;
    }

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        console.log("auth-guard.service.canActivateChild() url: " + url);
        return true;
    }
}
