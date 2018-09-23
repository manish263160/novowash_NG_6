import { Component, EventEmitter, OnDestroy, OnInit, Input, Output, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Observable, Subscription, Subscriber } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { DialogService } from "../../../common/services/dialog.service";
import { ServicesService } from "../../../core/services/services.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:use-host-property-decorator
    selector: "booking-dialog",
    styleUrls: ["../booking.dialog.component.scss"],
    templateUrl: "booking.dialog.component.html",
})
export class BookingDialogComponent implements OnDestroy, OnInit {
    @Input() public serviceItems = [];
    @Input() public selectedServiceId: number;
    @Input() public selectedServiceName: string;
    @Output() public onBookingCancelled: EventEmitter<any> = new EventEmitter();
    @Output() public onServiceSelected: EventEmitter<any> = new EventEmitter();
    public highlightedSubServiceId: number;
    public allSubscriptions: Subscription;
    public costSub: Subscription;
    public serviceDesc: any;
    public packages: any[];
    public subList = [];
    public allSubServices = [];
    public slide: number = 1;
    public totalAmount = 0;
    public mainPackages: any[];
    public extraPackages: any[];
    public categorisedPackages: any[];
    public mainServiceType: number = 0;
    public type3Object: {};
    public selectedObj = {
        mainService: null,
        subService: null, 
        mainPackages: [],
        extraPackages: [],
        type: null,
        subType: null,
        totalAmount: 0,
        couponApplied: null,
    };

    // private subServiceSub: any;
    
    constructor(
        private dialog: MatDialog ,
        private dialogRef: MatDialogRef<BookingDialogComponent>,
        private dialogService: DialogService,
        private servicesService: ServicesService,
        private _sanitizer: DomSanitizer,
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
        const subServiceSub = this.servicesService.getAllSubServices()
            .subscribe((val) => {
                this.allSubServices = val;
                this.loadSubServices();
            });
        if (this.allSubscriptions) {
            this.allSubscriptions.add(subServiceSub);
        } else {
            this.allSubscriptions = subServiceSub;
        }
    }

    ngOnDestroy() {
        if (this.allSubscriptions) {
            this.allSubscriptions.unsubscribe();
        }
        if (this.costSub) {
            this.costSub.unsubscribe();
        }
    }

    public updatePackageSelection(type, pack) {
        if (this.mainServiceType !== 6) {
            if (type === -1 && pack.selectedValue === 0) {
                return;
            }
        }
        let mainServ = this.serviceItems.filter((main) => main.id === this.selectedServiceId);
        let subServ = this.allSubServices.filter((sub) => sub.id === this.highlightedSubServiceId);
        this.selectedObj = {
            mainService: (mainServ && mainServ.length) ? mainServ[0] : null,
            subService: (subServ && subServ.length) ? subServ[0] : null, 
            mainPackages: [],
            extraPackages: [],
            type: null,
            subType: null,
            totalAmount: 0,
            couponApplied: null,
        };
        let tAmount = 0;
        switch (this.mainServiceType) {
            case 1:
            case 2:
            case 5: {
                pack.selectedValue += type;
                pack.isAdded = (pack.selectedValue > 0);
                this.packages.forEach((p) => {
                    if (p.isAdded) {
                        if (p.isExtras === 0) {
                            this.selectedObj.mainPackages.push(p);
                        } else if (p.isExtras === 1) {
                            this.selectedObj.extraPackages.push(p);
                        }
                        tAmount += (p.selectedValue * p.unitPrice);
                    }
                });
                break;
            }
            case 3:
            case 4: {
                pack.selectedValue += type;
                pack.isAdded = (pack.selectedValue > 0);
                tAmount += (pack.selectedValue * pack.unitPrice);
                this.selectedObj.mainPackages.push(pack);
                break;
            }
            case 6: {
                pack[0].selectedValue = pack[1].selectedValue = 1;
                pack[0].isAdded = pack[1].isAdded = true;
                this.packages.forEach((p) => {
                    if (p.id !== pack[0].id && p.id !== pack[1].id) {
                        p.isAdded = false;
                        p.selectedValue = 0;
                    }
                });
                tAmount = pack[0].unitPrice;
                this.selectedObj.type = pack[0];
                this.selectedObj.subType = pack[1];
                break;
            }
        }
        this.totalAmount = tAmount;
        this.selectedObj.totalAmount = tAmount;
    }

    public onBTValueChange() {
        this.packages.forEach((pack) => {
            pack.selectedValue = 0;
            pack.isAdded = false;
        });
        this.totalAmount = 0;
        if (this.selectedObj) {
            this.selectedObj.totalAmount = 0;
        }
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

    public getSelectedSubServiceName() {
        let serviceName = "Service Details";
        if (this.highlightedSubServiceId) {
            const selectedService = this.subList.filter((service) => {
                return service.id === this.highlightedSubServiceId;
            })
            if (selectedService && selectedService.length) {
                serviceName = selectedService[0].serviceName;
            }
        }
        return serviceName;
    }

    public loadSubServices() {
        if (this.selectedServiceId && this.allSubServices && this.allSubServices.length) {
            // this.subServiceSub = this.servicesService.getSubServices(this.selectedServiceId)
            //     .subscribe((val) => {
            //         this.subServiceSub.unsubscribe();
            //         this.subList = val;
            //     });
            switch (this.selectedServiceId) {
                case 1: {
                    this.mainServiceType = 1;
                    break;
                }
                case 2: {
                    this.mainServiceType = 2;
                    break;
                }
                case 3: {
                    this.mainServiceType = 3;
                    break;
                }
                case 4: {
                    this.mainServiceType = 4;
                    break;
                }
                case 5: {
                    this.mainServiceType = 5;
                    break;
                }
                case 6: {
                    this.mainServiceType = 6;
                    break;
                }
            }
            this.subList = this.allSubServices.filter((service) => service.serviceCatId === this.selectedServiceId);
        }
    }

    public loadPackages() {
        if (!this.packages) {
            return;
        }
        this.mainPackages = this.packages.filter((pack) => pack.isExtras === 0);
        this.extraPackages = this.packages.filter((pack) => pack.isExtras === 1);
    }

    public updatePackagesForSelection() {
        this.packages.forEach((pack) => {
            pack.selectedValue = 0;
            pack.isAdded = false;
        })
    }

    public onClickMainService(serviceId, serviceName){
        this.totalAmount = 0;
        this.selectedServiceId = serviceId;
        this.selectedServiceName = serviceName;
        this.loadSubServices();
    }

    public onClickSubServiceGetDesc(serviceId) {
        this.highlightedSubServiceId = serviceId;
        this.slide = 2;
        this.serviceDesc = "SAMPLE DESCRIPTION";
        // this.onClickSubService1(serviceId);
    }

    public onClickSubService1(serviceId) {
        this.highlightedSubServiceId = serviceId;
        this.totalAmount = 0;
        if (this.slide !== 3) {
            this.slide = 3;
        }
        this.costSub = this.servicesService.getCostByServiceID(serviceId)
            .subscribe((val) => {
                this.packages = val;
                if (this.packages) {
                    this.updatePackagesForSelection();
                    this.mainPackages = this.packages.filter((pack) => pack.isExtras === 0);
                    if (this.mainServiceType === 3 || this.mainServiceType === 4 || this.mainServiceType === 6) {
                        this.categoriseMainPackages();
                    }
                    this.extraPackages = this.packages.filter((pack) => pack.isExtras === 1);
                }
            });
        // this.loadPackages();
        // setTimeout(() => {
        //     const subEl = document.getElementById(`sub${serviceId}`);
        //     if (subEl) {
        //         subEl.scrollIntoView();
        //     }
        //     const cardEl = document.getElementById(`card${serviceId}`);
        //     if (cardEl) {
        //         cardEl.scrollIntoView();
        //     }
        // }, 100);
    }

    public categoriseMainPackages() {
        this.categorisedPackages = [];
        const categories = [];
        this.mainPackages.forEach((mp) => {
            if (mp.windowType === 2) {
                const key = mp.windowText;
                if (!categories.includes(key)) {
                    categories.push(key);
                }
            }
        })
        categories.forEach((category) => {
            const ob = {
                items: this.mainPackages.filter((pack) => pack.windowText === category),
                key: category,
            };
            this.categorisedPackages.push(ob);
        });
        // if (this.mainServiceType == 3 || this.mainServiceType === 4) {
        //     this.type3Object = {
        //         selectedValue: 0,
        //         userInputs: this.categorisedPackages[0].key,
        //         unitPrice: 0,
        //     }
        // }
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
        if (this.totalAmount <= 0) {
            window.alert("Please select a service to proceed");
            return;
        }
        // const selectedServices = {
        //     selectedServiceId: this.selectedServiceId,
        //     totalAmount: this.totalAmount,
        //     selectedPackages: [],
        // };
        // let selectedPackages = [];
        // this.packages.forEach((pack) => {
        //     if (pack.isAdded) {
        //         selectedPackages.push(pack);
        //     }
        // });
        // selectedServices.selectedPackages = selectedPackages;
        // this.onServiceSelected.emit(selectedServices);
        this.onServiceSelected.emit(this.selectedObj);
    }

    public closeDialog() {
        this.onBookingCancelled.emit();
    }
}

/* tslint:enable */
