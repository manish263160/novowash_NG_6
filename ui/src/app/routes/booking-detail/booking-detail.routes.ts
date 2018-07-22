import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { BookingDetailComponent } from "./booking-detail.component";

const routes: Routes = [
    {
        component: BookingDetailComponent,
        path: "",
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})

export class BookingDetailRoutes {
}
