import { Component, EventEmitter, OnDestroy, OnInit, Input, Output, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Observable, Subscription, Subscriber } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { CommonService } from "../../../common/services/common.service";
import { DialogService } from "../../../common/services/dialog.service";
import { ServicesService } from "../../../core/services/services.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:use-host-property-decorator
    selector: "booking-dialog",
    styleUrls: ["../booking.dialog.component.scss"],
    templateUrl: "package.booking.dialog.component.html",
})
export class PackageBookingDialogComponent implements OnDestroy, OnInit {
    // @Input() public serviceItems = [];
    @Input() public selectedServiceId: number;
    @Input() public selectedServiceName: string;
    @Input() public packageDescription: string;
    @Output() public onBookingCancelled: EventEmitter<any> = new EventEmitter();
    @Output() public onServiceSelected: EventEmitter<any> = new EventEmitter();
    public highlightedSubServiceId: number;
    public allSubscriptions: Subscription;
    public costSub: Subscription;
    public serviceDesc: any;
    public packages: any[];
    public packageCategories: any[];
    public categorisedPackages: any;
    public subPackageCategories: any;
    public windowText: string = "";
    public subWindowText: string = "";
    // public subList = [];
    public allSubServices = [];
    public slide: number = 1;
    public totalAmount = 0;
    public mainPackages: any[];
    public extraPackages: any[];
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

    //------------------these are the static data of the extra services------------------
    public extraService = {
      sofa:"assets/img/extras/icons_sofa_cleaning.png",
      carpet:"assets/img/extras/icons_carpet_cleaning.png",
      curtain:"assets/img/extras/icons_curtain_cleaning.png",
    };
    // private subServiceSub: any;

    constructor(
        public commonService: CommonService,
        private dialog: MatDialog ,
        private dialogRef: MatDialogRef<PackageBookingDialogComponent>,
        private dialogService: DialogService,
        private servicesService: ServicesService,
        private _sanitizer: DomSanitizer,
    ) {}

    ngOnInit() {
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
        }
        this.slide = 1;
        this.totalAmount = 0;
        this.serviceDesc = this.packageDescription;  /* "SAMPLE DESCRIPTTION"; */
        const subServiceSub = this.servicesService.getPackageItems(this.selectedServiceId)
            .subscribe((val) => {
                this.allSubServices = val;
                console.log(this.allSubServices)
                this.highlightedSubServiceId = (this.allSubServices && this.allSubServices[0]) ? this.allSubServices[0].id : 0;
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
        if (this.mainServiceType === 1 || this.mainServiceType === 2) {
            if (type === -1 && pack.selectedValue === 0) {
                return;
            }
        }
        let subServ = this.allSubServices.filter((sub) => sub.id === this.highlightedSubServiceId);
        this.selectedObj = {
            mainService: null,
            subService: (subServ && subServ.length) ? subServ[0] : null,
            mainPackages: [],
            extraPackages: [],
            type: null,
            subType: null,
            totalAmount: 0,
            couponApplied: null,
        };
        let tAmount = 0;
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

    public updatePackagesForSelection() {
        this.packages.forEach((pack) => {
            pack.selectedValue = 0;
            pack.isAdded = false;
        })
    }

    public onSubServiceSelection(event) {
        try {
            this.onClickSubService1(event.source.selected.value);
        } catch (e) {}
    }

    public onClickSubService1(serviceId) {
        this.highlightedSubServiceId = serviceId;
        this.totalAmount = 0;
        this.costSub = this.servicesService.getPackageCost(serviceId)
            .subscribe((val) => {
                this.packages = val;
                if (this.packages) {
                    this.updatePackagesForSelection();
                    const wt = this.packages[0].windowText;
                    if (this.mainServiceType === 1 || this.mainServiceType === 2) {
                        this.windowText = wt;
                    } else if (this.mainServiceType === 3 || this.mainServiceType === 4) {
                        const wtArr = wt.split(", ");
                        this.windowText = wtArr[0];
                        this.subWindowText = wtArr[1];
                    }
                    this.extraPackages = [];
                    const packageCategories = [];
                    const subPackageCategories = [];
                    const categorisedPackages = {};
                    if (this.mainServiceType === 1 || this.mainServiceType === 2) {
                        this.packages.forEach((pack) => {
                            if (!packageCategories.includes(pack.duration) && pack.duration.toString() !== "extras") {
                                packageCategories.push(pack.duration);
                                categorisedPackages[pack.duration] = {
                                    mainPackages: []
                                };
                            }
                            if (pack.isExtras === 0) {
                                categorisedPackages[pack.duration].mainPackages.push(pack);
                            } else if (pack.isExtras === 1) {
                              if(pack.userInputs === 'Sofa Cleaning'){
                                pack.imageUrl = this.extraService.sofa;
                              }else if(pack.userInputs === 'Carpet Cleaning'){
                                pack.imageUrl = this.extraService.carpet;
                              }else if(pack.userInputs === 'Curtain Cleaning'){
                                pack.imageUrl = this.extraService.curtain;
                              }
                                this.extraPackages.push(pack);
                            }
                        })
                        this.packageCategories = packageCategories;
                        this.categorisedPackages = categorisedPackages;
                    } else if (this.mainServiceType === 3 || this.mainServiceType === 4) {
                        this.packages.forEach((pack) => {
                            if (!packageCategories.includes(pack.duration)) {
                                packageCategories.push(pack.duration);
                            }
                            if (!subPackageCategories.includes(pack.userInputs)) {
                                subPackageCategories.push(pack.userInputs);
                            }
                        });
                        packageCategories.forEach((pc) => {
                            categorisedPackages[pc] = {};
                            subPackageCategories.forEach((spc) => {
                                categorisedPackages[pc][spc] = {
                                    mainPackages: []
                                }
                            });
                        });
                        this.packages.forEach((pack) => {
                            if (pack.isExtras === 0) {
                                categorisedPackages[pack.duration][pack.userInputs].mainPackages.push(pack);
                            } else if (pack.isExtras === 1) {
                                this.extraPackages.push(pack);
                            }
                        });
                        this.packageCategories = packageCategories;
                        this.subPackageCategories = subPackageCategories;
                        this.categorisedPackages = categorisedPackages;
                    }
                    setTimeout(() => {
                        if (this.slide !== 2) {
                            this.slide = 2;
                        }
                    }, 200);
                }
            });
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
        this.onServiceSelected.emit(this.selectedObj);
    }

    public closeDialog() {
        this.onBookingCancelled.emit();
    }
}

/* tslint:enable */
