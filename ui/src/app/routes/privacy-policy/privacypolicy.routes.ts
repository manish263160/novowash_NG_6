import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { PrivacyPolicyComponent } from "./privacypolicy.component";
import { AuthGuard } from "../../auth/auth.guard";

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: PrivacyPolicyComponent,
        path: "",
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})

export class PrivacyPolicyRoutes {
}
