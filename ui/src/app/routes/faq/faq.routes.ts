import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { FAQComponent } from "./faq.component";
import { AuthGuard } from "../../auth/auth.guard";

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: FAQComponent,
        path: "",
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})

export class FAQRoutes {
}
