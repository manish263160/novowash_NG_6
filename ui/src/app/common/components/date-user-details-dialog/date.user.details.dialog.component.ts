import { Component, EventEmitter, OnDestroy, OnInit, Input, Output, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import * as moment from "moment";
import { Observable, Subscription, Subscriber } from "rxjs";
import { DialogService } from "../../../common/services/dialog.service";
import { ValidatorService } from "../../../common/services/validator.service";
import { LoginComponent } from "../../../login/login.component";
import { Address } from "../../../model/address";
import { ROPCService } from "../../../../app/auth/ropc.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:use-host-property-decorator
    selector: "date-user-details-dialog",
    styleUrls: ["../booking.dialog.component.scss"],
    templateUrl: "date.user.details.dialog.component.html",
})
export class DateUserDetailsDialogComponent implements OnDestroy, OnInit {
    @Input() slide: number;
    @Input() address: Address;
    @Input() selectedServiceName: string;
    @Input() selectedDateTimeIndex: any[];
    @Output() public onDetailEnteringCancelled: EventEmitter<any> = new EventEmitter();
    @Output() public onDetailEntered: EventEmitter<any> = new EventEmitter();
    public allSubscriptions: Subscription;
    public addressForm: FormGroup;
    public userForm: FormGroup;
    public dateTimeSlots: any;
    public cities: any[];
    public selectedDateIndex: number;
    public pattern = "^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))$";

    private subServiceSub: any;
    
    constructor(
        private dialog: MatDialog ,
        private dialogRef: MatDialogRef<DateUserDetailsDialogComponent>,
        private dialogRefLogin: MatDialogRef<LoginComponent>,
        private dialogService: DialogService,
        private fb: FormBuilder,
        private ropcService: ROPCService,
    ) {}

    ngOnInit() {
        if (!this.slide) {
            this.slide = 1;
        } else if (this.slide === 2) {
            this.loadTimeSlots();
        }
        this.loadCities();
        this.initAddressForm();
        if (this.address) {
            this.addressForm.patchValue(this.address);
        }
    }

    ngOnDestroy() {
        if (this.allSubscriptions) {
            this.allSubscriptions.unsubscribe();

        }
        if (this.subServiceSub) {
            this.subServiceSub.unsubscribe();
        }
    }

    public loadCities() {
        this.cities = [
            {value: 'ncr-0', viewValue: 'Delhi-NCR'},
            {value: 'mumbai-1', viewValue: 'Mumbai'},
            {value: 'bangalore-2', viewValue: 'Bangalore'}
        ];
    }

    public initAddressForm() {
        this.addressForm = this.fb.group({
            addressLine: ["", Validators.compose([ Validators.required ])],
            landmark: [""],
            city: ["", Validators.compose([ Validators.required ])],
            pincode: [null, Validators.compose([ Validators.required, Validators.pattern("^[1-9][0-9]{5}$") ])],
        });
    }

    public loadTimeSlots() {
        if (!this.dateTimeSlots || !(Object.keys(this.dateTimeSlots)).length) {
            this.dateTimeSlots = [{
                date: new Date(),
                timeSlots: [{
                    name: "7AM - 9AM",
                    isBlocked: true,
                }, {
                    name: "9AM - 12PM",
                    isBlocked: false,
                }, {
                    name: "12PM - 3PM",
                    isBlocked: false,
                }, {
                    name: "3PM - 6PM",
                    isBlocked: false,
                }],
                isBlocked: false,
            }, {
                date: (new Date()).setDate((new Date()).getDate()+1),
                timeSlots: [{
                    name: "7AM - 9AM",
                    isBlocked: false,
                }, {
                    name: "9AM - 12PM",
                    isBlocked: false,
                }, {
                    name: "12PM - 3PM",
                    isBlocked: false,
                }, {
                    name: "3PM - 6PM",
                    isBlocked: false,
                }],
                isBlocked: false,
            }];
            this.dateTimeSlots.map((slot) => {
                slot.dateText = moment(slot.date).format("dddd, MMM Do");
                slot.dateText = slot.dateText.split(", ");
            });
        }
        this.selectedDateIndex = 
            (this.selectedDateTimeIndex && this.selectedDateTimeIndex[0]) ?
            this.selectedDateTimeIndex[0] : 0;
    }

    public proceedToSlide2() {
        this.slide = 2;
        this.loadTimeSlots();
    }

    public proceedToSlide3() {
        this.slide = 3;
        if (!this.ropcService.user.number) {
            this.ropcService.user.number = "9987777224";
        }
        this.userForm = this.fb.group({
            email: [this.ropcService.user.email, Validators.compose([Validators.required, Validators.pattern(this.pattern)])],
            number: [this.ropcService.user.number, Validators.compose([Validators.required, ValidatorService.phoneValidator])],
        });
        this.userForm.controls.number.disable();
    }

    public proceedToUser() {
        if (this.ropcService.user) {
            this.proceedToSlide3();
        } else {
            this.openLoginSignUpDialog();
        }
    }

    public submitDateUserDetails() {

    }

    public selectDateIndex(index) {
        this.selectedDateIndex = index;
        this.selectedDateTimeIndex = [index];
    }

    public selectTimeIndex(index) {
        this.selectedDateTimeIndex[1] = index;
    }

    public backButtonClicked() {

    }

    public openLoginSignUpDialog() {
        const dlEl = document.getElementsByClassName("dialog-panel-booking")[0];
        if (dlEl) {
            dlEl.classList.add("hidden");
        }
        const config = new MatDialogConfig();
        config.width = "75%";
        config.disableClose = true;
        config.panelClass = "dialog-panel-login";
        config.position = {
            bottom: "",
            left: "",
            right: "",
            top: "",
        };
        this.dialogRefLogin = this.dialog.open(LoginComponent, config);
        this.dialogRefLogin.componentInstance.isForBooking = true;
        this.dialogRefLogin.componentInstance.selectedServiceName = this.selectedServiceName;
        this.dialogRefLogin.componentInstance.onLoginCancelled.subscribe(() => {
            console.log("onLoginCancelled()");
            this.dialogRefLogin.close();
        });
        this.dialogRefLogin.componentInstance.onLoginSuccessful.subscribe((user) => {
            console.log("onLoginSuccessful()");
            this.dialogRefLogin.close();
            this.proceedToSlide3();
        });
        this.dialogRefLogin.afterClosed().subscribe((result) => {
            this.dialogRefLogin = null;
            dlEl.classList.remove("hidden");
        });
    }

    public closeDialog() {
        this.onDetailEnteringCancelled.emit();
    }
}

/* tslint:enable */
