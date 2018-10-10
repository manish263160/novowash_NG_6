import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { UserProfileComponent } from "./user.profile.component";

const routes: Routes = [
    {
        component: UserProfileComponent,
        path: "",
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})

export class UserProfileRoutes {
}
