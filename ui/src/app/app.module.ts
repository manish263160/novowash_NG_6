import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
} from "@angular/material";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";

import { AuthGuard } from "./core/services/auth-guard.service";
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from "./login/login.component";

import { ConfirmDialogComponent } from "./common/components/confirm-dialog.component";
import { ErrorDialogComponent } from "./common/components/error.dialog.component";
import { FirstKeyPipe } from "./common/pipes/first.key.pipe";
import { environment } from "../environments/environment";
import { DeactivateGuardService } from "./common/services/deactivate-guard.service";
import { DialogService } from "./common/services/dialog.service";
import { ITDatepickerService } from "./common/services/it-datepicker-service";

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent,
        ConfirmDialogComponent,
        ErrorDialogComponent,
        FirstKeyPipe,
    ],
    entryComponents: [
        ConfirmDialogComponent,
        ErrorDialogComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        MatDividerModule,
        MatMenuModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatSelectModule,
    ],
    providers: [
        DeactivateGuardService,
        DialogService,
        ITDatepickerService,
    ],
})
export class AppModule {}
