import { Routes } from "@angular/router";
import { AuthGuard } from "../core/services/auth-guard.service";
import { LayoutComponent } from "../layout/layout.component";

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "app",
    },
    {
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                loadChildren: "./routes/home/home.module#HomeModule",
                path: "home",
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
