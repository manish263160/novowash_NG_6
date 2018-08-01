import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { map, combineLatest } from 'rxjs/operators';

@Injectable()
export class ROPCService {
  private _user: any;

  constructor(private httpClient: HttpClient, private oauthService: OAuthService) {}

  public async login(username: string, password: string) {
    debugger;
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', environment.auth.grantType);
    
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .set("Authorization", "Basic d2ViOnNlY3JldA==");

    this.httpClient
      .post(this.oauthService.tokenEndpoint, body.toString(), {headers})
      .pipe(map((res: any) => {
        debugger;
      })).subscribe(
        data => {
          debugger;
        },
        err => {
          debugger;
        }
      )
  }

  public logOut() {
    if (this.oauthService.getRefreshToken() === null) {
      return;
    }
    const refreshToken = this.oauthService.getRefreshToken();
    const accessToken = this.oauthService.getAccessToken();

    this.oauthService.logOut(true);

    const body = new HttpParams().set("client_id", this.oauthService.clientId).set("refresh_token", refreshToken);

    return this.httpClient.post(this.oauthService.logoutUrl, body.toString(), {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded"),
    });
  }

  public get user() {
    return this._user;
  }
  public set user(user) {
    this._user = user;
  }
}
