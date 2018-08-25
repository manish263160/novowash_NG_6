import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BookingDialogComponent } from "./common/components/booking-dialog/booking.dialog.component";
import { ConfirmDialogComponent } from "./common/components/confirm-dialog.component";
import { ErrorDialogComponent } from "./common/components/error.dialog.component";
import { FirstKeyPipe } from "./common/pipes/first.key.pipe";
import { ImagePipe } from "./common/pipes/image.pipe";

import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
} from "@angular/material";

@NgModule({
    declarations: [
        BookingDialogComponent,
        ConfirmDialogComponent,
        ErrorDialogComponent,
        FirstKeyPipe,
        ImagePipe,
    ],
    exports: [
        FirstKeyPipe,
        ImagePipe,
    ],
    schemas: [],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatRadioModule,
    ],
})

export class SharedModule {}
