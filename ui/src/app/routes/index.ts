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
                loadChildren: "./routes/about-us/about-us.module#AboutUsModule",
                path: "about-us",
            },
            {
                loadChildren: "./routes/be-a-partner/beapartner.module#BeAPartnerModule",
                path: "be-a-partner",
            },
            {
                loadChildren: "./routes/home/home.module#HomeModule",
                path: "home",
            },
            {
                loadChildren: "./routes/faq/faq.module#FAQModule",
                path: "faq",
            },
            {
                loadChildren: "./routes/privacy-policy/privacypolicy.module#PrivacyPolicyModule",
                path: "privacy-policy",
            },
            {
                loadChildren: "./routes/terms-of-use/termsofuse.module#TermsOfUseModule",
                path: "terms-of-use",
            },
            {
                loadChildren: "./routes/booking-detail/booking-detail.module#BookingDetailModule",
                path: "mybookings/:id",
            },
            {
                loadChildren: "./routes/bookings/bookings.module#BookingsModule",
                path: "mybookings",
            },
            {
                loadChildren: "./routes/user-profile/user.profile.module#UserProfileModule",
                path: "myprofile",
            },
        ],
        component: LayoutComponent,
        path: "app",
    },
];
