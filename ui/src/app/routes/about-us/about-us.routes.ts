import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { AboutUsComponent } from "./about-us.component";
import { AuthGuard } from "../../auth/auth.guard";

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: AboutUsComponent,
        path: "",
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})

export class AboutUsRoutes {
}
