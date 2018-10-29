import { Component, EventEmitter, OnInit, Input, Output, ViewEncapsulation } from "@angular/core";
import { ROPCService } from "../../../../app/auth/ropc.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:use-host-property-decorator
    selector: "booking-end-dialog",
    styleUrls: ["../booking.dialog.component.scss"],
    templateUrl: "booking.end.dialog.component.html",
})
export class BookingEndDialogComponent implements OnInit {
    @Input() public isSuccess: boolean;
    @Input() public isChashOn: boolean;
    @Input() public totalAmount: any;
    @Output() public onBookingEndClosed: EventEmitter<any> = new EventEmitter();

    constructor(
        private ropcService: ROPCService,
    ) {}

    ngOnInit() {}

    public closeDialog() {
        this.onBookingEndClosed.emit();
    }
}
