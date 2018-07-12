import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatButton, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { NavigationStart, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { DialogService } from "../common/services/dialog.service";
import { ITMenuService } from "../common/services/it-menu-service";
import { LoginComponent } from "../login/login.component";
import { UserService } from "../core/services/user.service";
import { map } from 'rxjs/operators';
import { User } from "../model/user";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "novowash-layout",
    styleUrls: ["./layout.component.scss"],
    templateUrl: "./layout.component.html",
})

export class LayoutComponent implements OnInit, OnDestroy {
    public isIE: boolean = false;
    public isSafari: boolean = false;
    public user: User;

    private dialogRef: MatDialogRef<LoginComponent>;
    private config: MatDialogConfig;

    constructor(
        private dialog: MatDialog,
        private userService: UserService,
        public itMenuService: ITMenuService
    ) {
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
    
    public ngOnInit(): void {
        this.checkIsLoggedIn();
    }

    public checkIsLoggedIn() {
        if (this.userService.isLoggedIn()) {
            this.user = this.userService.getLoggedInUserInfo();
        }
    }

    public getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    public openLoginSignUpDialog() {
        this.dialogRef = this.dialog.open(LoginComponent, this.config);
        this.dialogRef.componentInstance.onLoginCancelled.subscribe(() => {
            console.log("onLoginCancelled()");
            this.dialogRef.close();
        });
        this.dialogRef.componentInstance.onLoginSuccessful.subscribe((user) => {
            console.log("onLoginSuccessful()");
            this.dialogRef.close();
            this.user = user;
        });
        this.dialogRef.afterClosed().subscribe((result) => {
            this.dialogRef = null;
        });
    }

    public getInitials(): string {
        const names = this.user.full_name.split(" ");
        let initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    }

    public ngOnDestroy() {}
}
