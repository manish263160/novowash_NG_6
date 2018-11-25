import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StarRatingModule } from 'angular-star-rating';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { ConfirmDialogComponent } from "./common/components/confirm-dialog.component";
import { ErrorDialogComponent } from "./common/components/error.dialog.component";
import { SuccesMsgComponent } from './common/components/succes-msg.component';
// import { FirstKeyPipe } from "./common/pipes/first.key.pipe";
import { environment } from "../environments/environment";
import { BookingService } from "./common/services/booking.service";
import { CommonService } from "./common/services/common.service";
import { DeactivateGuardService } from "./common/services/deactivate-guard.service";
import { DialogService } from "./common/services/dialog.service";
import { ITDatepickerService } from "./common/services/it-datepicker-service";
import { ITMenuService } from "./common/services/it-menu-service";
// import { AuthGuard } from "./core/services/auth-guard.service";
import { CoreModule } from "./core/core.module";
import { CustomHttpInterceptor } from "./core/custom.http.interceptor";
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "./shared.module";






@NgModule({
    bootstrap: [
        AppComponent,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent,
        SuccesMsgComponent,
      ],
      entryComponents: [
        ConfirmDialogComponent,
        ErrorDialogComponent,
        LoginComponent,
        SuccesMsgComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
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
        SharedModule,
        StarRatingModule.forRoot(),
        CoreModule.forRoot(),
    ],
    providers: [
        {
            multi: true,
            provide: HTTP_INTERCEPTORS,
            useClass: CustomHttpInterceptor,
        },
        DeactivateGuardService,
        DialogService,
        ITDatepickerService,
        ITMenuService,
        BookingService,
        CommonService,
    ],
})
export class AppModule {}
