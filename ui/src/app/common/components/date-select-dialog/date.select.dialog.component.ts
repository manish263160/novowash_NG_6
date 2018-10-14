import { Component, EventEmitter, OnDestroy, OnInit, Input, Output, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import * as moment from "moment";
import { Observable, Subscription, Subscriber } from "rxjs";
import { ValidatorService } from "../../../common/services/validator.service";
import { ServicesService } from "../../../core/services/services.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:use-host-property-decorator
    selector: "date-select-dialog",
    styleUrls: ["../booking.dialog.component.scss"],
    templateUrl: "date.select.dialog.component.html",
})
export class DateSelectDialogComponent implements OnDestroy, OnInit {
    @Input() selectedServiceId: any;
    @Output() public onDateSelectionCancelled: EventEmitter<any> = new EventEmitter();
    @Output() public onDateSelected: EventEmitter<any> = new EventEmitter();
    public allSubscriptions: Subscription;
    public dateTimeSlots: any;
    public selectedDateIndex: number = -1;
    public selectedTimeIndex: number = -1

    constructor(
        private dialogRef: MatDialogRef<DateSelectDialogComponent>,
        private servicesService: ServicesService,
    ) {}

    ngOnInit() {
        this.loadTimeSlots();
    }

    ngOnDestroy() {
        if (this.allSubscriptions) {
            this.allSubscriptions.unsubscribe();
        }
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
                        const b = {date: dA[0], dateText: dA[0].split("-")[2], isBlocked: (dA[1] === "false" ? true : false), timeSlots: []};
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

    public submiDate() {
        let selectedDate = this.dateTimeSlots[this.selectedDateIndex];
        let timeSlot = selectedDate.timeSlots[this.selectedTimeIndex];
        const dateDetails = {
            date: selectedDate ? selectedDate.date : null,
            time: timeSlot ? timeSlot.name : null,
        };
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