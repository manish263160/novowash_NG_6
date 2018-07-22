import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Service } from "../../model/service";
import { DialogService } from "../../common/services/dialog.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "booking-detail-component",
    styleUrls: ["./booking-detail.component.scss"],
    templateUrl: "./booking-detail.component.html",
})

export class BookingDetailComponent implements OnInit, OnDestroy {
    public allSubscriptions: Subscription;
    public service: Service;
    private serviceId: any;

    constructor(
        public route: ActivatedRoute,
        private router: Router,
        private dialogService: DialogService,
    ) {}

    public ngOnInit() {
        this.allSubscriptions = this.route.params.subscribe((params: any) => {
            this.serviceId = params.id;
            this.service = {
                id: this.serviceId,
                name: "Service Name",
                postedOn: new Date(),
                serviceOn: new Date(),
                technician: {
                    id: 1,
                    name: "Shreedhar Kumar",
                    rating: 4.6,
                    reviewCount: 134,
                    phone: "+919988121212"
                }
            };
        })
    }

    public ngOnDestroy() {
        this.allSubscriptions.unsubscribe();
    }
}