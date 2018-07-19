import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { SlickModule } from 'ngx-slick';
import { DialogService } from "../../common/services/dialog.service";
import { ConfirmDialogComponent } from "../../common/components/confirm-dialog.component";
import { BookingsComponent } from "./bookings.component";
import { BookingsRoutes } from "./bookings.routes";
import { SharedModule } from "../../shared.module";

import { 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
} from "@angular/material";

@NgModule({
    declarations: [
        BookingsComponent,
    ],
    entryComponents: [
        ConfirmDialogComponent,
    ],
    imports: [
        CommonModule,
        BookingsRoutes,
        FlexLayoutModule,
        SlickModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        SharedModule,
    ],
    providers: [
        DialogService,
    ],
})

export class BookingsModule {}