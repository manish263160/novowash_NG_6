import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatButton, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { NavigationStart, Router } from "@angular/router";
import { Observable } from "rxjs";

import { DialogService } from "../common/services/dialog.service";
import { LoginComponent } from "../login/login.component";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "novowash-layout",
    styleUrls: ["./layout.component.scss"],
    templateUrl: "./layout.component.html",
})

export class LayoutComponent implements OnInit, OnDestroy {
    public isIE: boolean = false;
    public isSafari: boolean = false;

    private dialogRef: MatDialogRef<LoginComponent>;
    private config: MatDialogConfig;

    constructor(private dialog: MatDialog) {
        const docStr = "documentMode";
        const msie = document[docStr];
        if (msie) {
            this.isIE = true;
        }

        const ua = navigator.userAgent;
        const isChrome = ua.indexOf("Chrome") !== -1;
        this.isSafari = ua.indexOf("Safari") !== -1 && !isChrome;

        this.config = new MatDialogConfig();
        this.config.backdropClass = "cdk-overlay-custom-backdrop";
        this.config.width = "75%";
        this.config.disableClose = true;
        this.config.panelClass = "dialog-panel-login";
        this.config.position = {
            bottom: "",
            left: "",
            right: "",
            top: "",
        };
    }
    
    public ngOnInit(): void {}

    public getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    public openLoginSignUpDialog() {
        this.dialogRef = this.dialog.open(LoginComponent, this.config);
        this.dialogRef.componentInstance.onLoginCancelled.subscribe(() => {
            console.log("onLoginCancelled()");
            this.dialogRef.close();
        });
        this.dialogRef.afterClosed().subscribe((result) => {
            this.dialogRef = null;
        });
    }

    public ngOnDestroy() {}
}
