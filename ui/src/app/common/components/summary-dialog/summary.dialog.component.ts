import { Component, EventEmitter, OnInit, Input, Output, ViewEncapsulation } from "@angular/core";
import { ROPCService } from "../../../../app/auth/ropc.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:use-host-property-decorator
    selector: "summary-dialog",
    styleUrls: ["../booking.dialog.component.scss"],
    templateUrl: "summary.dialog.component.html",
})
export class SummaryDialogComponent implements OnInit {
    @Input() public selectedServices: any;
    @Output() public onSummaryCancelled: EventEmitter<any> = new EventEmitter();
    @Output() public onSummaryConfirmed: EventEmitter<any> = new EventEmitter();

    constructor(
        public ropcService: ROPCService,
    ) {}

    ngOnInit() {
        if (!this.selectedServices) {
            this.selectedServices = {};
        }
    }

    public submitSummary() {
        this.onSummaryConfirmed.emit();
    }

    public closeDialog() {
        this.onSummaryCancelled.emit();
    }
}