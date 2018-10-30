import { Component, HostListener, OnDestroy, OnInit, Pipe, PipeTransform, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Observable, Subscription } from "rxjs";
import { ROPCService } from "../../../app/auth/ropc.service";
import { AddressChangeDialogComponent } from "../../common/components/address-change-dialog/address.change.dialog.component";
import { DateSelectDialogComponent } from "../../common/components/date-select-dialog/date.select.dialog.component";
import { CommonService } from "../../common/services/common.service";
import { DialogService } from "../../common/services/dialog.service";
import { ITMenuService } from "../../common/services/it-menu-service";
import { ValidatorService } from "../../common/services/validator.service";
import { ProfileService } from "../../core/services/profile.service";
import { ServicesService } from "../../core/services/services.service";

@Pipe({
    name: "novoUserAddress",
  })
export class NovoUserAddressPipe implements PipeTransform {
    public transform(input: any, args?: any): any {
        let address = "";
        try {
            let addrObj = JSON.parse(input.userAddress);
            address =
                addrObj.addressLine + ", " +
                ((addrObj.landmark && addrObj.landmark.length) ? (addrObj.landmark + ", ") : "" ) +
                input.city + " " + addrObj.pincode;
        } catch (e) {}
        return address;
    }
}

@Pipe({
    name: "novoCurlBracketRemover",
  })
export class NnovoCurlBracketRemoverPipe implements PipeTransform {
    public transform(input: any, args?: any): any {
        try {
            let len = input.length - 1;
            if (input[0] === "{" && input[len] === "}") {
                input = input.substring(1, len)
            }
        } catch (e) {}
        return input;
    }
}

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
    public serviceUpdateSub: Subscription;
    public packageUpdateSub: Subscription;
    public bookedServices: any;
    public bookedPackages: any;
    public slide: string;
    public userForm: FormGroup;
    public userEmailString:string;
    public isUserDetailEdit: boolean = false;

    public rgexString: string = "a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð";
    public namePattern = new RegExp("^[" + this.rgexString + ",.'-]+([" + this.rgexString + " ,.'-]+)*$");
    public emailPattern = "^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))$";

    private dialogRef: MatDialogRef<any>;
    private config: MatDialogConfig;

    constructor(
        public commonService: CommonService,
        public itMenuService: ITMenuService,
        public ropcService: ROPCService,
        private fb: FormBuilder,
        private profileService: ProfileService,
        private servicesService: ServicesService,
        private _sanitizer: DomSanitizer,
        private dialog: MatDialog,
        private dialogService: DialogService,
    ) {
        this.config = new MatDialogConfig();
        if (this.commonService.getViewPort() === "mobile") {
            this.config.width = "100%";
            this.config.height = "100%";
            this.config.panelClass = ["dialog-panel-booking", "dp-booking-mobile"];
        } else {
            this.config.width = "75%";
            this.config.panelClass = ["dialog-panel-booking"];
        }
        this.config.disableClose = true;
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
            this.userEmailString =
                (this.ropcService.user.email && this.ropcService.user.email.length) ? this.ropcService.user.email : "<user email id not available>";
            this.getBookedItems("service");
            this.getBookedItems("package");
        }
    }

    public getBookedItems(type: string = "service") {
        if (type === "service") {
            this.allSubscriptions = this.profileService.getBookedServices(this.ropcService.user.id)
                .subscribe((val) => {
                    this.bookedServices = val || {};
                })
        } else if (type === "package") {
            this.packageSub = this.profileService.getBookedPackgaes(this.ropcService.user.id)
                .subscribe((val) => {
                    this.bookedPackages = val;
                })
        }
    }

    public initUserForm() {
        this.userForm = this.fb.group({
            email: [this.ropcService.user ? this.ropcService.user.email: '' , Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
            name: [this.ropcService.user ? this.ropcService.user.username : '', Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
        });
    }

    public saveUserDetailEdit() {
        this.userUpdateSub = this.profileService.updateUserDetails(
            this.ropcService.user.id,
            this.userForm.controls.name.value,
            this.userForm.controls.email.value
        ).subscribe((res) => {
                if (res === true) {
                    const loginSub = this.ropcService.login(this.ropcService.user.mobile_number, this.ropcService.otp)
                        .subscribe((res) => {
                                location.reload();
                            });
                }
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
        if (this.slide === 'profile') {
            this.cancelUserDetailEdit();
        }
        this.slide = slideName;
    }

    public onClickServiceChangeTime(index, service) {
        this.dialogRef = this.dialog.open(DateSelectDialogComponent, this.config);
        this.dialogRef.componentInstance.selectedServiceId = service.id;
        this.dialogRef.componentInstance.type = "service";

        this.dialogRef.componentInstance.onDateSelectionCancelled.subscribe(() => {
            console.log("onDateSelectionCancelled()");
            this.dialogRef.close();
        });
        this.dialogRef.componentInstance.onDateSelected.subscribe((dateDetails) => {
            console.log("onDateSelected()");
            this.dialogRef.close();
            service.bookingDate = dateDetails.date;
            service.bookingTime = dateDetails.time;
            this.serviceUpdateSub = this.profileService.updateServiceDate(
                "service", service
            ).subscribe((res) => {
                if (res === true) {
                    this.getBookedItems("service");
                }
            });
        });
    }

    public onClickServiceChangeAddress(index, service) {
        this.dialogRef = this.dialog.open(AddressChangeDialogComponent, this.config);
        this.dialogRef.componentInstance.selectedService = service;

        this.dialogRef.componentInstance.onAddressChangeCancelled.subscribe(() => {
            console.log("onAddressChangeCancelled()");
            this.dialogRef.close();
        });
        this.dialogRef.componentInstance.onAddressChanged.subscribe((newAddress) => {
            console.log("onAddressChanged()");
            this.dialogRef.close();
            service.userAddress = newAddress;
            this.serviceUpdateSub = this.profileService.updateServiceAddress(
                "service", service
            ).subscribe((res) => {
                if (res === true) {
                    this.getBookedItems("service");
                }
            });
        });
    }

    public onClickPackageChangeTime(index, pack) {
        this.dialogRef = this.dialog.open(DateSelectDialogComponent, this.config);
        this.dialogRef.componentInstance.selectedServiceId = pack.id;
        this.dialogRef.componentInstance.selectedPackExpiry = pack.expiredDate;
        this.dialogRef.componentInstance.type = "package";

        this.dialogRef.componentInstance.onDateSelectionCancelled.subscribe(() => {
            console.log("onDateSelectionCancelled()");
            this.dialogRef.close();
        });
        this.dialogRef.componentInstance.onDateSelected.subscribe((dateDetails) => {
            console.log("onDateSelected()");
            this.dialogRef.close();
            pack.lastBookingDate = dateDetails.date;
            pack.lastBookingTime = dateDetails.time;
            this.packageUpdateSub = this.profileService.insertPackageDateSlot(
                pack
            ).subscribe((res) => {
                if (res === true) {
                    this.getBookedItems("package");
                }
            });
        });
    }

    public onClickPackageChangeAddress(index, pack) {
        this.dialogRef = this.dialog.open(AddressChangeDialogComponent, this.config);
        this.dialogRef.componentInstance.selectedService = pack;

        this.dialogRef.componentInstance.onAddressChangeCancelled.subscribe(() => {
            console.log("onAddressChangeCancelled()");
            this.dialogRef.close();
        });
        this.dialogRef.componentInstance.onAddressChanged.subscribe((newAddress) => {
            console.log("onAddressChanged()");
            this.dialogRef.close();
            pack.userAddress = newAddress;
            this.packageUpdateSub = this.profileService.updateServiceAddress(
                "package", pack
            ).subscribe((res) => {
                if (res === true) {
                    this.getBookedItems("package");
                }
            });
        });
    }

    public ngOnDestroy() {
        if (this.allSubscriptions) {
            this.allSubscriptions.unsubscribe();
        }
        if (this.packageSub) {
            this.packageSub.unsubscribe();
        }
        if (this.userUpdateSub) {
            this.userUpdateSub.unsubscribe();
        }
        if (this.serviceUpdateSub) {
            this.serviceUpdateSub.unsubscribe();
        }
        if (this.packageUpdateSub) {
            this.packageUpdateSub.unsubscribe();
        }
    }
}
