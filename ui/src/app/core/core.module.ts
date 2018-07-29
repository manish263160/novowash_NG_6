import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { CommonModule } from '@angular/common';

import { UserService } from "./services/user.service";
import { ServicesService } from "./services/services.service";
import { AuthGuard } from "./services/auth-guard.service";


@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [],
    declarations: [],
    providers: [
        AuthGuard,
        ServicesService,
        UserService,
    ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}