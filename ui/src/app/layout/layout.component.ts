import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatButton, MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar, MatMenuTrigger } from "@angular/material";
import { NavigationStart, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { DialogService } from "../common/services/dialog.service";
import { CommonService } from "../common/services/common.service";
import { ITMenuService } from "../common/services/it-menu-service";
import { ValidatorService } from "../common/services/validator.service";
import { LoginComponent } from "../login/login.component";
import { ROPCService } from "../auth/ropc.service";
import { ServicesService } from "../core/services/services.service";
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
    public companyQItems: any[] = [];
    public servingItems: any[] = [];
    public helpForm: FormGroup;
    public pattern = "^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))$";

    @ViewChild("helpTrigger") public helpTrigger: MatMenuTrigger;

    private dialogRef: MatDialogRef<LoginComponent>;
    private config: MatDialogConfig;
    private hSub: Subscription;

    constructor(
        public ropcService: ROPCService,
        public itMenuService: ITMenuService,
        private dialog: MatDialog,
        private userService: UserService,
        private servicesService: ServicesService,
        private router: Router,
        private fb: FormBuilder,
        public snackBar: MatSnackBar,
        public commonService: CommonService,
    ) {
        this.config = new MatDialogConfig();
        // this.config.backdropClass = "cdk-overlay-custom-backdrop";
        this.config.width = this.commonService.getViewPort() === "mobile" ? "90%" : "75%";
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
        this.initHelpForm();
        this.companyQItems = [{
            page: "about-us",
            text: "About Us"
        }, {
            page: "be-a-partner",
            text: "Be A Partner"
        }, {
            page: "faq",
            text: "Frequently Asked Questions"
        }, {
            page: "privacy-policy",
            text: "Privacy Policy"
        }, {
            page: "terms-of-use",
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

    public initHelpForm() {
        this.helpForm = this.fb.group({
            name: ["", Validators.compose([ Validators.required ])],
            number: ["", Validators.compose([Validators.required, ValidatorService.phoneValidator])],
        });
    }

    public onClickHelpSubmit() {
        if (this.helpForm.invalid) {
            return;
        }
        this.hSub = this.servicesService.registerForHelp({...this.helpForm.value})
            .subscribe((res) => {
                console.log(`RES from help register:::: ${res}`);
                if (res === true || res === "true") {
                    this.helpTrigger.closeMenu();
                    this.openSnackBar("Thank you. We will get back to you soon.", "success");
                }
            });
    }

    public goToPage(pageName) {
        this.router.navigate([`/app/${pageName}`]);
    }

    public checkIsLoggedIn() {
        // if (this.ropcService.isLoggedIn()) {
        //     this.user = this.userService.getLoggedInUserInfo();
        // }
        // const user = this.ropcService.getLoggedInUser();
        // if (Object.keys(user).length) {
        //     this.user = user;
        //     const unStr = "user_name";
        //     this.user.full_name = this.user[unStr];
        //     this.user.full_name = this.user.full_name.replace("User [", "");
        //     this.user.full_name = this.user.full_name.replace("]", "");
        //     const unArr = this.user.full_name.split(", ");
        //     this.user.full_name = unArr[1].replace("username=", "");
        //     this.user.full_name = this.user.full_name.replace("_", " ");
        // }
        this.ropcService.getLoggedInUser();
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
            try {
                if (location.href.includes("/app/myprofile")) {
                    location.reload();
                }
            } catch (e) {}
            // const unStr = "user_name";
            // if (Object.keys(user).length) {
            //     this.user = user;
            //     this.user.full_name = this.user[unStr];
            //     this.user.full_name = this.user.full_name.replace("User [", "");
            //     this.user.full_name = this.user.full_name.replace("]", "");
            //     const unArr = this.user.full_name.split(", ");
            //     this.user.full_name = unArr[1].replace("username=", "");
            //     this.user.full_name = this.user.full_name.replace("_", " ");
            // }
        });
        this.dialogRef.afterClosed().subscribe((result) => {
            this.dialogRef = null;
        });
    }

    public getInitials(): string {
        // const logUser = this.ropcService.user;
        // let fullName = "";
        // if (logUser && Object.keys(logUser).length)  {
        //     const unStr = "user_name";
        //     fullName = logUser[unStr];
        //     fullName = fullName.replace("User [", "");
        //     fullName = fullName.replace("]", "");
        //     const unArr = fullName.split(", ");
        //     fullName = unArr[1].replace("username=", "");
        //     fullName = fullName.replace("_", " ");
        // }
        // const names = fullName.split(" ");
        // let initials = names[0].substring(0, 1).toUpperCase();

        // if (names.length > 1) {
        //     initials += names[names.length - 1].substring(0, 1).toUpperCase();
        // }
        // return initials;
        let fullName;
        try {
            const logUser = this.ropcService.user;
            fullName = logUser.username.replace("_", " ");
            const names = fullName.split(" ");
            fullName = names[0];
        } catch (e) {
            fullName = "Account";
        }
        return fullName;
    }

    public goToMyProfile() {
        this.router.navigate(["/app/myprofile"]);
    }

    public logout() {
        const user = this.ropcService.logOut();
        if (this.router.url !== "/app/home") {
            this.goToPage("home");
        }
        setTimeout(() => {
            this.openLoginSignUpDialog();
        }, 500);
        // this.user = null;
    }

    public openSnackBar(message: string, panelClass:string = "", action: string = "") {
        this.snackBar.open(message, action, {
          duration: 2000,
          panelClass: panelClass,
        });
    }

    public onMenuOpen() {
        const bEl = document.getElementsByTagName("body")[0];
        if (bEl) {
            bEl.style.overflow = "hidden";
        }
    }

    public onMenuClose() {
        const bEl = document.getElementsByTagName("body")[0];
        if (bEl) {
            bEl.style.overflow = "auto";
        }
    }

    public ngOnDestroy() {}
}
