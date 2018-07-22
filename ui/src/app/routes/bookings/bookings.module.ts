import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { BookingsComponent } from "./bookings.component";
import { BookingsRoutes } from "./bookings.routes";
import { SharedModule } from "../../shared.module";

import {
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
} from "@angular/material";

@NgModule({
    declarations: [
        BookingsComponent,
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        BookingsRoutes,
        FlexLayoutModule,
        MatTabsModule,
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        SharedModule,
    ],
    providers: [],
})

export class BookingsModule {}