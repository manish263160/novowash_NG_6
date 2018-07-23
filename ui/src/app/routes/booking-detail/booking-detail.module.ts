import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { DialogService } from "../../common/services/dialog.service";
import { ConfirmDialogComponent } from "../../common/components/confirm-dialog.component";
import { BookingDetailComponent } from "./booking-detail.component";
import { BookingDetailRoutes } from "./booking-detail.routes";
import { SharedModule } from "../../shared.module";

import { StarRatingModule } from "angular-star-rating"

import { 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
} from "@angular/material";

@NgModule({
    declarations: [
        BookingDetailComponent,
    ],
    entryComponents: [
        ConfirmDialogComponent,
    ],
    imports: [
        CommonModule,
        BookingDetailRoutes,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        SharedModule,
        StarRatingModule,
    ],
    providers: [
        DialogService,
    ],
})

export class BookingDetailModule {}