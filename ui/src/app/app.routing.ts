import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./core/services/auth-guard.service";
import { routes } from "./routes";

@NgModule({
    exports: [
        RouterModule,
    ],
    imports: [
        RouterModule.forRoot(routes, {enableTracing: false}),
    ],
    providers: [
        AuthGuard,
    ],
})
export class AppRoutingModule {}