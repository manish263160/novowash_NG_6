import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Payment } from "../../model/payment";
import { Service } from "../../model/service";
import { DialogService } from "../../common/services/dialog.service";
import { ServicesService } from "../../core/services/services.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "booking-detail-component",
    styleUrls: ["./booking-detail.component.scss"],
    templateUrl: "./booking-detail.component.html",
})

export class BookingDetailComponent implements OnInit, OnDestroy {
    public allSubscriptions: Subscription;
    public service: any = {};
    public paymentDetail: Payment[];
    public ccNumber = "+919898112233";
    private serviceId: any;

    constructor(
        public route: ActivatedRoute,
        private router: Router,
        private dialogService: DialogService,
        private servicesService: ServicesService,
    ) {}

    public ngOnInit() {
        this.allSubscriptions = this.route.params.subscribe((params: any) => {
            this.serviceId = params.id;
            let servSub = this.servicesService.getService(this.serviceId)
                .subscribe((val) => {
                    Object.assign(this.service, val);
                });
            let paySub = this.servicesService.getServicePaymentDetails(this.serviceId)
                .subscribe((val) => {
                    this.paymentDetail = val;
                })
            // this.allSubscriptions.add(servSub);
            // this.allSubscriptions.add(paySub);
        })
    }

    public getTelHref(number) {
        return "tel:" + number;
    }

    public getSubTotal() {
        let subTotal = 0;
        this.paymentDetail.forEach((payment) => {
            subTotal += payment.amount;
        })
        return subTotal;
    }

    public ngOnDestroy() {
        this.allSubscriptions.unsubscribe();
    }
}