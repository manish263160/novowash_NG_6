import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable, Subscription } from "rxjs";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "bookings-component",
    styleUrls: ["./bookings.component.scss"],
    templateUrl: "./bookings.component.html",
})

export class BookingsComponent implements OnInit, OnDestroy {
    public allSubscriptions: Subscription;
    public currentBookings: any[];
    public previousBookings: any[];

    constructor() {}

    public ngOnInit() {
        this.currentBookings = [{
            title: "Booking 1",
            status: "Request Ongoing",
            date: "9 July 2018",
            details: "Booking for a service"
        }, {
            title: "Booking 2",
            status: "Request Ongoing",
            date: "9 July 2018",
            details: "Booking for a service"
        }, {
            title: "Booking 3",
            status: "Request Ongoing",
            date: "9 July 2018",
            details: "Booking for a service"
        }, {
            title: "Booking 4",
            status: "Request Ongoing",
            date: "9 July 2018",
            details: "Booking for a service"
        }];
        this.previousBookings = [{
            title: "PBooking 1",
            status: "Request Completed",
            date: "9 July 2018",
            details: "Booking for a service"
        }, {
            title: "PBooking 2",
            status: "Request Completed",
            date: "9 July 2018",
            details: "Booking for a service"
        }, {
            title: "PBooking 3",
            status: "Request Completed",
            date: "9 July 2018",
            details: "Booking for a service"
        }, {
            title: "PBooking 4",
            status: "Request Completed",
            date: "9 July 2018",
            details: "Booking for a service"
        }];
    }

    public onCategoryChange(event) {}

    public ngOnDestroy() {}
}