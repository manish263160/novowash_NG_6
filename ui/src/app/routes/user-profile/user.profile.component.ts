import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Observable, Subscription } from "rxjs";
import { ROPCService } from "../../../app/auth/ropc.service";
import { CommonService } from "../../common/services/common.service";
import { DialogService } from "../../common/services/dialog.service";
import { ValidatorService } from "../../common/services/validator.service";
import { ProfileService } from "../../core/services/profile.service";
import { ServicesService } from "../../core/services/services.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "user-profile-component",
    styleUrls: ["./user.profile.component.scss"],
    templateUrl: "./user.profile.component.html",
})

export class UserProfileComponent implements OnInit, OnDestroy {
    public allSubscriptions: Subscription;
    public packageSub: Subscription;
    public userUpdateSub: Subscription;
    public bookedServices: any;
    public bookedPackages: any;
    public slide: string;
    public userForm: FormGroup;
    public isUserDetailEdit: boolean = false;

    public rgexString: string = "a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð";
    public namePattern = new RegExp("^[" + this.rgexString + ",.'-]+([" + this.rgexString + " ,.'-]+)*$");
    public emailPattern = "^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))$";

    private dialogRef: MatDialogRef<any>;
    private config: MatDialogConfig;

    constructor(
        public commonService: CommonService,
        public ropcService: ROPCService,
        private fb: FormBuilder,
        private profileService: ProfileService,
        private servicesService: ServicesService,
        private _sanitizer: DomSanitizer,
        private dialog: MatDialog,
        private dialogService: DialogService,
    ) {
        this.config = new MatDialogConfig();
        this.config.width = "75%";
        this.config.disableClose = true;
        this.config.panelClass = "dialog-panel-booking";
        this.config.position = {
            bottom: "",
            left: "",
            right: "",
            top: "",
        };
    }

    public ngOnInit() {
        this.initUserForm();
        this.onClickLeftMenu('profile');
        if (this.ropcService.user) {
            this.allSubscriptions = this.profileService.getBookedServices(this.ropcService.user.id)
                .subscribe((val) => {
                    this.bookedServices = val;
                })
            this.packageSub = this.profileService.getBookedPackgaes(this.ropcService.user.id)
                .subscribe((val) => {
                    this.bookedPackages = val;
                })
        }
    }

    public initUserForm() {
        this.userForm = this.fb.group({
            email: [this.ropcService.user.email, Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
            name: [this.ropcService.user.username, Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
        });
    }

    public saveUserDetailEdit() {
        this.userUpdateSub = this.profileService.updateUserDetails(
            this.ropcService.user.id, 
            this.userForm.controls.name.value, 
            this.userForm.controls.email.value
        ).subscribe((res) => {
                location.reload();
            });
    }

    public enableUserDetailEdit() {
        this.initUserForm();
        this.isUserDetailEdit = true;
    }

    public cancelUserDetailEdit() {
        this.isUserDetailEdit = false;
    }

    public onClickLeftMenu(slideName) {
        this.slide = slideName;
    }

    public ngOnDestroy() {
        if (this.allSubscriptions) {
            this.allSubscriptions.unsubscribe();
        }
        if (this.packageSub) {
            this.packageSub.unsubscribe();
        }
    }
}