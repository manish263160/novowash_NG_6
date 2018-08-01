import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";
import { OAuthEvent } from "angular-oauth2-oidc/events";
import { Observable, Subscription } from "rxjs";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { catchError, filter, mergeMap } from "rxjs/operators";
import { ROPCService } from "./ropc.service";

@Injectable()
export class AuthService {
  private refresher: Subscription;
  private monitorer: Subscription;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ropcService: ROPCService,
    private oauthService: OAuthService,
  ) { }

  public logout() {
    this.stopAutoRefreshToken();
    return this.ropcService.logOut();
  }

  public stopAutoRefreshToken() {
    if (this.refresher && !this.refresher.closed) {
      this.refresher.unsubscribe();
    }
  }

  public startAutoRefreshTokenImplicit() {
    this.oauthService.setupAutomaticSilentRefresh();
    this.monitorSessionActivities();
  }

  public startAutoRefreshToken() {
    if (this.refresher && !this.refresher.closed) {
      this.refresher.unsubscribe();
    }
    if (this.monitorer && !this.monitorer.closed) {
      this.monitorer.unsubscribe();
    }
    this.refresher = this.oauthService.events.pipe(
      filter((e: OAuthEvent) => e.type === "token_expires"),
      mergeMap(() => fromPromise(this.oauthService.refreshToken())),
      catchError((error: HttpErrorResponse) => {
        console.log("Auto token refresh failed. Logging Out...", error.error);
        this.logout().subscribe(() => {
          this.router.navigate(["/app/home"]);
        });
        return ErrorObservable.create(error.error);
      }),
    ).subscribe( (data) => {
      console.log("asdfasdf", data);
    });

    this.monitorSessionActivities();
  }

  private monitorSessionActivities() {
    this.monitorer = this.oauthService.events.subscribe((e) => {
      switch (e.type) {
        case "logout":
        case "session_terminated":
          console.log("Your session has been terminated!", e);
          this.logoutActions();
          break;
        case "token_received":
          console.log("received token_received event", e);
          // this.store.dispatch(new LoadProfile());
          // this.oauthService.loadUserProfile();
          break;
        case "token_expires":
          console.log("received token_expires event", e);
          break;
        case "user_profile_loaded":
          console.log("received user_profile_loaded event", e);
          break;
        case "session_changed":
          console.log("received session_changed event", e);
          break;
        default:
          console.log("default: session event", e);
      }
    });
  }

  private logoutActions() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }
}
