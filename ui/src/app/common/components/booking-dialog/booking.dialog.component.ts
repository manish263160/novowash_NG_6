import { animate, group, state, style, transition, trigger } from "@angular/animations";
import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Input, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from "@angular/router";
import { ValidatorService } from "../../services/validator.service";
import { Observable, Subscription, Subscriber } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { DialogService } from "../../../common/services/dialog.service";
import { ServicesService } from "../../../core/services/services.service";
import { User } from "../../../model/user";

@Component({
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:use-host-property-decorator
    selector: "booking-dialog",
    styleUrls: ["booking.dialog.component.scss"],
    templateUrl: "booking.dialog.component.html",
})
export class BookingDialogComponent implements OnDestroy, OnInit {
    @Input() public serviceItems = [];
    @Input() public selectedServiceId: number;
    @Output() public onBookingCancelled: EventEmitter<any> = new EventEmitter();
    public highlightedSubServiceId: number;
    public allSubscriptions: Subscription;
    public packages: any[];
    public subList = [];
    public slide: number = 1;
    public totalAmount = 0;

    private subServiceSub: any;
    
    constructor(
        private dialog: MatDialog ,
        public element: ElementRef,
        private dialogRef: MatDialogRef<BookingDialogComponent>,
        private dialogService: DialogService,
        private servicesService: ServicesService,
        private _sanitizer: DomSanitizer,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        if (!this.serviceItems || !this.serviceItems.length) {
            const serviceSub = this.servicesService.getServices()
                .subscribe((val) => {
                    this.serviceItems = val;
                });
            if (this.allSubscriptions) {
                this.allSubscriptions.add(serviceSub);
            } else {
                this.allSubscriptions = serviceSub;
            }
        }
        this.loadSubServices();
    }

    ngOnDestroy() {
        if (this.allSubscriptions) {
            this.allSubscriptions.unsubscribe();
        }
        if (this.subServiceSub) {
            this.subServiceSub.unsubscribe();
        }
    }

    public updatePackageSelection(pack) {
        // this.totalAmount = this.values.reduce((a, b) => a + b);
        pack.isAdded = !pack.isAdded;
        let amnt = 0;
        this.packages.forEach((pack) => {
            if (pack.isAdded) {
                amnt += Number.parseInt(pack.selectedValue);
            }
        });
        this.totalAmount = amnt;
    }

    public getSelectedServiceName() {
        let serviceName = "Book A Service";
        if (this.selectedServiceId) {
            const selectedService = this.serviceItems.filter((service) => {
                return service.id === this.selectedServiceId;
            })
            if (selectedService && selectedService.length) {
                serviceName = selectedService[0].catName;
            }
        }
        return serviceName;
    }

    public loadSubServices() {
        if (this.selectedServiceId) {
            this.subServiceSub = this.servicesService.getSubServices(this.selectedServiceId)
                .subscribe((val) => {
                    this.subServiceSub.unsubscribe();
                    this.subList = val;
                });
            // if (this.allSubscriptions) {
            //     this.allSubscriptions.add(subServiceSub);
            // } else {
            //     this.allSubscriptions = subServiceSub;
            // }
        }
    }

    public loadPackages() {
        this.packages = [{
            description: "Description of sofa cleaning",
            serviceId: 5,
            serviceName: "Sofa cleaning",
            serviceDesc: "How many sofa(s) do you want to get cleaned?",
            items: [{
                costDetails: "3 Sofa Seats (Rs 750)",
                id: 7,
                price: 750,
            }, {
                costDetails: "4 Sofa Seats (Rs 1000)",
                id: 8,
                price: 1000,
            }, {
                costDetails: "5 Sofa Seats (Rs 1250)",
                id: 9,
                price: 1250,
            }, {
                costDetails: "6 Sofa Seats Rs 1500)",
                id: 10,
                price: 1500,
            }]
        }, {
            description: "Description of carpet cleaning",
            serviceId: 6,
            serviceName: "Carpet cleaning",
            serviceDesc: "How many carpets need to be cleaned? (standard size 8ft X 4ft)",
            items: [{
                costDetails: "1 Carpet (Rs 499)",
                id: 14,
                price: 499,
            }, {
                costDetails: "2 Carpets (Rs 899)",
                id: 15,
                price: 899,
            }, {
                costDetails: "3 Carpets (Rs 1399)",
                id: 16,
                price: 1399,
            }, {
                costDetails: "4 Carpets (Rs 1899)",
                id: 17,
                price: 1899,
            }]
        }, {
            description: "Description of matress cleaning",
            serviceId: 7,
            serviceName: "Matress cleaning",
            serviceDesc: "How many mattress(es) need to be cleaned?",
            items: [{
                costDetails: "1 mattress  (Rs 799)",
                id: 26,
                price: 799,
            }, {
                costDetails: "2 mattress (Rs 1599)",
                id: 27,
                price: 1599,
            }, {
                costDetails: "3 mattress (Rs 2399)",
                id: 28,
                price: 2399,
            }]
        }, {
            description: "Description of chair cleaning",
            serviceId: 8,
            serviceName: "Chair cleaning",
            serviceDesc: "How many chairs need to be cleaned?",
            items: [{
                costDetails: "1 chair  (Rs 799)",
                id: 31,
                price: 799,
            }, {
                costDetails: "2 chairs (Rs 1599)",
                id: 32,
                price: 1599,
            }, {
                costDetails: "3 chairs (Rs 2399)",
                id: 33,
                price: 2399,
            }]
        }];
        this.updatePackagesForSelection();
    }

    public updatePackagesForSelection() {
        this.packages.forEach((pack) => {
            pack.selectedValue = -1;
            pack.isAdded = false;
        })
    }

    public onClickMainService(serviceId){
        this.selectedServiceId = serviceId;
        this.loadSubServices();
    }

    public onClickSubService1(serviceId) {
        this.highlightedSubServiceId = serviceId;
        this.slide = 2;
        this.loadPackages();
        setTimeout(() => {
            const subEl = document.getElementById(`sub${serviceId}`);
            if (subEl) {
                subEl.scrollIntoView();
            }
            const cardEl = document.getElementById(`card${serviceId}`);
            if (cardEl) {
                cardEl.scrollIntoView();
            }
        }, 100);
    }

    public onClickSubService2(serviceId) {
        this.highlightedSubServiceId = serviceId;
        const cardEl = document.getElementById(`card${serviceId}`);
        if (cardEl) {
            cardEl.scrollIntoView();
        } 
    }

    public getBackground(image) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    }

    public backButtonClicked() {

    }

    public submitServiceSelection() {
        
    }

    public closeDialog() {
        this.onBookingCancelled.emit();
    }
}

/* tslint:enable */
