import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { BeAPartnerComponent } from "./beapartner.component";

const routes: Routes = [
    {
        component: BeAPartnerComponent,
        path: "",
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})

export class BeAPartnerRoutes {
}
