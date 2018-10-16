import { Component, EventEmitter, OnInit, Input, Output, ViewEncapsulation } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import 'rxjs/add/operator/catch';
import { ROPCService } from "../../../../app/auth/ropc.service";
import { ServicesService } from "../../../core/services/services.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:use-host-property-decorator
    selector: "summary-dialog",
    styleUrls: ["../booking.dialog.component.scss"],
    templateUrl: "summary.dialog.component.html",
})
export class SummaryDialogComponent implements OnInit {
    @Input() public selectedServices: any;
    @Input() public isForPackage: boolean = false;
    @Output() public onSummaryCancelled: EventEmitter<any> = new EventEmitter();
    @Output() public onSummaryConfirmed: EventEmitter<any> = new EventEmitter();

    public noCouponEntered: boolean;
    public noValidCouponCode: boolean;
    public couponSuccessful: boolean;
    public couponCodeApplied: any;
    public couponDiscount: any;
    public packageSub: Subscription;

    constructor(
        public servicesService: ServicesService,
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

    public removeCoupon() {
        this.noCouponEntered = this.noValidCouponCode = this.couponSuccessful = false;
        this.selectedServices.couponApplied = this.couponCodeApplied = null;
        this.selectedServices.couponDiscount = this.couponDiscount = 0;
        if (this.selectedServices.totalAmountOriginal) {
            this.selectedServices.totalAmount = this.selectedServices.totalAmountOriginal;
        }
    }

    public applyCoupon(couponCode) {
        couponCode = couponCode ? couponCode.trim() : "";
        if (!couponCode || !couponCode.length) {
            this.noCouponEntered = true;
            this.noValidCouponCode = false;
            return;
        }
        this.packageSub = this.servicesService.getCouponValidity(couponCode)
                .catch((err) => {
                    this.noValidCouponCode = true;
                    this.noCouponEntered = false;
                    return null;
                })
                .subscribe((val) => {
                    this.couponCodeApplied = couponCode;
                    this.couponSuccessful = true;
                    this.couponDiscount = 300;
                    this.selectedServices.couponApplied = this.couponCodeApplied;
                    this.selectedServices.couponDiscount = this.couponDiscount;
                    this.selectedServices.totalAmountOriginal = this.selectedServices.totalAmount;
                    this.selectedServices.totalAmount = this.selectedServices.totalAmountOriginal - this.couponDiscount;
                    this.noCouponEntered =  this.noValidCouponCode= false;
                    return;
                });
    }

    public closeDialog() {
        this.onSummaryCancelled.emit();
    }
}
