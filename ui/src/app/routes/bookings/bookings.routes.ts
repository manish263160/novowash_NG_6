import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { BookingsComponent } from "./bookings.component";

const routes: Routes = [
    {
        component: BookingsComponent,
        path: "",
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})

export class BookingsRoutes {
}
