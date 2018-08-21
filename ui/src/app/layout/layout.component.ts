import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, ElementRef } from "@angular/core";
import { MatButton, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { NavigationStart, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { DialogService } from "../common/services/dialog.service";
import { ITMenuService } from "../common/services/it-menu-service";
import { LoginComponent } from "../login/login.component";
import { ROPCService } from "../auth/ropc.service";
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
    public companyQItems: any[] = [];
    public servingItems: any[] = [];

    private dialogRef: MatDialogRef<LoginComponent>;
    private config: MatDialogConfig;

    constructor(
        private dialog: MatDialog,
        private userService: UserService,
        private ropcService: ROPCService,
        private router: Router,
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
        // this.config.backdropClass = "cdk-overlay-custom-backdrop";
        this.config.width = "75%";
        this.config.disableClose = true;
        this.config.panelClass = "dialog-panel-login";
        this.config.position = {
            bottom: "",
            left: "",
            right: "",
            top: "",
        };

        if (this.router.url === "/app") {
            this.router.navigate(["/app/home"]);
        }
    }
    
    public ngOnInit(): void {
        this.checkIsLoggedIn();
        this.companyQItems = [{
            href: "#",
            text: "Company Overview"
        }, {
            href: "#",
            text: "Frequently Asked Questions"
        }, {
            href: "#",
            text: "Privacy Policy"
        }, {
            href: "#",
            text: "Terms of Use"
        }];
        let servingItemsTotal = [
            "New Delhi",
            "North-West Delhi",
            "West Delhi",
            "South-West Delhi",
            "South Delhi",
            "Gurgaon",
            "South-East Delhi",
            "Central Delhi",
            "Norht-East Delhi",
            "Shahdara",
            "East Delhi",
            "Noida",
        ];
        this.servingItems[0] = servingItemsTotal.splice(0, servingItemsTotal.length/2);
        this.servingItems[1] = servingItemsTotal;
    }

    public goToPage(pageName) {
        this.router.navigate([`/app/${pageName}`]);
    }

    public checkIsLoggedIn() {
        // if (this.ropcService.isLoggedIn()) {
        //     this.user = this.userService.getLoggedInUserInfo();
        // }
        const user = this.ropcService.getLoggedInUser();
        if (Object.keys(user).length) {
            this.user = user;
            const unStr = "user_name";
            this.user.full_name = this.user[unStr];
            this.user.full_name = this.user.full_name.replace("User [", "");
            this.user.full_name = this.user.full_name.replace("]", "");
            const unArr = this.user.full_name.split(", ");
            this.user.full_name = unArr[1].replace("username=", "");
            this.user.full_name = this.user.full_name.replace("_", " ");
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
            const unStr = "user_name";
            console.log("onLoginSuccessful()");
            this.dialogRef.close();
            if (Object.keys(user).length) {                
                this.user = user;
                this.user.full_name = this.user[unStr];
                this.user.full_name = this.user.full_name.replace("User [", "");
                this.user.full_name = this.user.full_name.replace("]", "");
                const unArr = this.user.full_name.split(", ");
                this.user.full_name = unArr[1].replace("username=", "");
                this.user.full_name = this.user.full_name.replace("_", " ");
            }
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

    public gotoBookings() {
        this.router.navigate(["/app/mybookings"]);
    }

    public logout() {}

    public ngOnDestroy() {}
}
