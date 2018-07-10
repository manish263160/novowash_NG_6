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
        component: LayoutComponent,
        path: "app",
    },
];
