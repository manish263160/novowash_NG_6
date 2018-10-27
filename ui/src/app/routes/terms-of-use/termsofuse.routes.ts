import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { TermsOfUseComponent } from "./termsofuse.component";
import { AuthGuard } from "../../auth/auth.guard";

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: TermsOfUseComponent,
        path: "",
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})

export class TermsOfUseRoutes {
}
