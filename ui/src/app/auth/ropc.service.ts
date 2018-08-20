import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { OAuthService,  } from "angular-oauth2-oidc";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { map, combineLatest } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class ROPCService {
  private _user: any;

  constructor(private httpClient: HttpClient, private oauthService: OAuthService) {}

  public getOTP(mobileNo: string) {
    return this.httpClient
      .post(environment.auth.otpUrl + `?mobileNo=${mobileNo}`, "");
  }

  public login(username: string, password: string) {
    debugger;
    const url = this.oauthService.tokenEndpoint
      + `?grant_type=${environment.auth.grantType}&username=${username}&password=${password}`;

    
    // let params = new URLSearchParams();
    // params.append('username', username);
    // params.append('password', password);    
    // params.append('grant_type','password');
    // params.append('client_id','novo-client'); 
    
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .set("Authorization", "Basic " + btoa("novo-client:novo-secret"));

    return this.httpClient
      .post(url, "", {headers})
      .pipe(map((res: { access_token: string, refresh_token: string }) => {
        if (res) {
          localStorage.setItem("access_token", res.access_token);
          localStorage.setItem("refreshToken", res.refresh_token);
          const jwtHelper = new JwtHelperService();
          this.user = jwtHelper.decodeToken(res.access_token);
          return this.user;
        } else {
          this.user = {};
          return {};
        }
      }));
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
