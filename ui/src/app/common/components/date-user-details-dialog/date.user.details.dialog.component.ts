import { Component, EventEmitter, OnDestroy, OnInit, Input, Output, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import * as moment from "moment";
import { Observable, Subscription, Subscriber } from "rxjs";
import { DialogService } from "../../../common/services/dialog.service";
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
    public dateTimeSlots: any;
    public cities: any[];
    public selectedDateIndex: number;

    private subServiceSub: any;
    
    constructor(
        private dialog: MatDialog ,
        private dialogRef: MatDialogRef<DateUserDetailsDialogComponent>,
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

    public proceedToUser() {
        if (this.ropcService.user) {
            alert ("Logged In!");
        } else {
            alert ("Not Logged In");
        }
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

    public submitDateTimeSelection() {
        
    }

    public closeDialog() {
        this.onDetailEnteringCancelled.emit();
    }
}

/* tslint:enable */
