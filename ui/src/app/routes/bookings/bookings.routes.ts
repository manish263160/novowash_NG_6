import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { BookingsComponent } from "./bookings.component";
import { AuthGuard } from "../../auth/auth.guard";

const routes: Routes = [
    {
        canActivate: [AuthGuard],
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
