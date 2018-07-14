import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";

const routes: Routes = [
    {
        component: HomeComponent,
        path: "",
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})

export class HomeRoutes {
}
