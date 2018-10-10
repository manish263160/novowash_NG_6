import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Observable, Subscription } from "rxjs";
import { ROPCService } from "../../../app/auth/ropc.service";
import { CommonService } from "../../common/services/common.service";
import { DialogService } from "../../common/services/dialog.service";
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
    public bookedServices: any;
    public bookedPackages: any;
    private dialogRef: MatDialogRef<any>;
    private config: MatDialogConfig;

    constructor(
        public commonService: CommonService,
        public ropcService: ROPCService,
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

    public ngOnDestroy() {
        if (this.allSubscriptions) {
            this.allSubscriptions.unsubscribe();
        }
        if (this.packageSub) {
            this.packageSub.unsubscribe();
        }
    }
}