import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { environment } from "../../environments/environment";

@Injectable()
export class ROPCService {
  private _user: any;

  constructor(private httpClient: HttpClient, private oauthService: OAuthService) {}

  public async login(username: string, password: string) {
    debugger;
    const profile: any = await this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password);
    localStorage.setItem("profile" , JSON.stringify(profile));
    this.user = profile;
    return profile;
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
