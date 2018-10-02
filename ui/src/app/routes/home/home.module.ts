import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { SlickModule } from 'ngx-slick';
import { DialogService } from "../../common/services/dialog.service";
import { BookingDialogComponent } from "../../common/components/booking-dialog/booking.dialog.component";
import { BookingEndDialogComponent } from "../../common/components/booking-end-dialog/booking.end.dialog.component";
import { DateUserDetailsDialogComponent } from "../../common/components/date-user-details-dialog/date.user.details.dialog.component";
import { PackageBookingDialogComponent } from "../../common/components/package-booking-dialog/package.booking.dialog.component";
import { SummaryDialogComponent } from "../../common/components/summary-dialog/summary.dialog.component";
import { SharedModule } from "../../shared.module";
import { HomeComponent } from "./home.component";
import { HomeRoutes } from "./home.routes";

import { 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
} from "@angular/material";

@NgModule({
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
        BookingDialogComponent,
        BookingEndDialogComponent,
        DateUserDetailsDialogComponent,
        PackageBookingDialogComponent,
        SummaryDialogComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutes,
        FlexLayoutModule,
        SlickModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        SharedModule,
    ],
    providers: [
        // DialogService,
    ],
})

export class HomeModule {}