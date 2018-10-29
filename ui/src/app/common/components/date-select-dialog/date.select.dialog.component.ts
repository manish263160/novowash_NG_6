import { Component, EventEmitter, OnDestroy, OnInit, Input, Output, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import * as moment from "moment";
import { Observable, Subscription, Subscriber } from "rxjs";
import { CommonService } from "../../../common/services/common.service";
import { ValidatorService } from "../../../common/services/validator.service";
import { ServicesService } from "../../../core/services/services.service";
import { every } from "rxjs/operators";

@Component({
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:use-host-property-decorator
    selector: "date-select-dialog",
    styleUrls: ["../booking.dialog.component.scss"],
    templateUrl: "date.select.dialog.component.html",
})
export class DateSelectDialogComponent implements OnDestroy, OnInit {
    @Input() selectedServiceId: any;
    @Input() selectedPackExpiry: any;
    @Input() type: string;
    @Output() public onDateSelectionCancelled: EventEmitter<any> = new EventEmitter();
    @Output() public onDateSelected: EventEmitter<any> = new EventEmitter();
    public allSubscriptions: Subscription;
    public calendarData: any;
    public pDateStr: string;
    public dateTimeSlots: any;
    public selectedDateIndex: number = -1;
    public selectedTimeIndex: number = -1

    constructor(
        public commonService: CommonService,
        private dialogRef: MatDialogRef<DateSelectDialogComponent>,
        private servicesService: ServicesService,
    ) {}

    ngOnInit() {
        if (!this.type || !this.type.length) {
            this.type = "service";
        }
        if (this.type === "service") {
            this.loadTimeSlots();
        } else if (this.type === "package") {
            this.loadCalendarData();
        }
    }

    ngOnDestroy() {
        if (this.allSubscriptions) {
            this.allSubscriptions.unsubscribe();
        }
    }

    public loadCalendarData() {
        this.calendarData = {};
        this.calendarData.maxDate = new Date(this.selectedPackExpiry);
        this.calendarData.minDate = new Date();
    }

    public loadTimeSlots() {
        if (!this.dateTimeSlots || !(Object.keys(this.dateTimeSlots)).length) {
            let dtObject = {};
            const sub = this.servicesService.getDateTimeSlots(this.selectedServiceId)
                .subscribe((val) => {
                    dtObject = val;
                    this.dateTimeSlots = [];
                    Object.keys(dtObject).forEach((key) => {
                        const dA = key.split("##");
                        const day = dA[0] !== undefined ? new Date(dA[0]).getDay() : null;
                        const daysArray = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
                        // console.log("----",day,"============"+daysArray[0]);
                        const b = {date: dA[0], dateText: dA[0].split("-")[2], isBlocked: (dA[1] === "false" ? true : false), timeSlots: [], dayText : day ? daysArray[day]: ''};
                        const tO = dtObject[key];
                        if (tO) {
                            Object.keys(tO).forEach((tKey) => {
                                const t = {name: tKey, text: tKey.replace(/ AM/g, "am").replace(/ PM/g, "pm"), isBlocked: !tO[tKey]};
                                b.timeSlots.push(t);
                            });
                        }
                        this.dateTimeSlots.push(b);
                    });
                });
            if (this.allSubscriptions) {
                this.allSubscriptions.add(sub);
            } else {
                this.allSubscriptions = sub;
            }
        }
        this.selectedDateIndex =  0;
    }

    public onPDateChange(event) {
        try {
            if (event) {
                this.pDateStr = moment(event.value.toISOString()).format("YYYY-MM-DD");
            }
        } catch (e) {}
    }

    public submiDate() {
        const dateDetails = {
            date: null,
            time: null,
        }
        if (this.type === "service") {
            let selectedDate = this.dateTimeSlots[this.selectedDateIndex];
            let timeSlot = selectedDate.timeSlots[this.selectedTimeIndex];
            dateDetails.date = selectedDate ? selectedDate.date : null;
            dateDetails.time = timeSlot ? timeSlot.name : null;
        } else if (this.type === "package") {
            dateDetails.date = this.pDateStr;
            dateDetails.time = "";
        }
        this.onDateSelected.emit(dateDetails);
    }

    public selectDateIndex(index) {
        this.selectedDateIndex = index;
        this.selectedTimeIndex = -1;
    }

    public selectTimeIndex(index) {
        this.selectedTimeIndex = index;
    }

    public closeDialog() {
        this.onDateSelectionCancelled.emit();
    }
}
