import { Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { LayoutComponent } from "../layout/layout.component";

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "app",
    },
    {
        children: [
            {
                loadChildren: "./routes/home/home.module#HomeModule",
                path: "home",
            },
            {
                loadChildren: "./routes/booking-detail/booking-detail.module#BookingDetailModule",
                path: "mybookings/:id",
            },
            {
                loadChildren: "./routes/bookings/bookings.module#BookingsModule",
                path: "mybookings",
            },
        ],
        component: LayoutComponent,
        path: "app",
    },
];
