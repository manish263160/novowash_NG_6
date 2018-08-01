import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { OAuthModule, OAuthService } from "angular-oauth2-oidc";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { initializeAuth } from "./oauth.init";
import { ROPCService } from "./ropc.service";

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ["http://13.59.141.30:8080/NovoWash"],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [ROPCService, AuthService, AuthGuard],
})
export class AuthModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [ { provide: APP_INITIALIZER, useFactory: initializeAuth, deps: [OAuthService], multi: true } ],
    };
  }
}
