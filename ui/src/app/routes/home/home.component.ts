import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Observable, Subscription } from "rxjs";
import { ROPCService } from "../../../app/auth/ropc.service";
import { BookingDialogComponent } from "../../common/components/booking-dialog/booking.dialog.component";
import { BookingEndDialogComponent } from "../../common/components/booking-end-dialog/booking.end.dialog.component";
import { DateUserDetailsDialogComponent } from "../../common/components/date-user-details-dialog/date.user.details.dialog.component";
import { PackageBookingDialogComponent } from "../../common/components/package-booking-dialog/package.booking.dialog.component";
import { SummaryDialogComponent } from "../../common/components/summary-dialog/summary.dialog.component";
import { DialogService } from "../../common/services/dialog.service";
import { ServicesService } from "../../core/services/services.service";

declare var Instamojo: any;

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "home-component",
    styleUrls: ["./home.component.scss"],
    templateUrl: "./home.component.html",
})

export class HomeComponent implements OnInit, OnDestroy {
    public allSubscriptions: Subscription;
    public slides = [
        {img: "http://placehold.it/350x150/000000"},
        {img: "http://placehold.it/350x150/111111"},
        {img: "http://placehold.it/350x150/777777"},
        {img: "http://placehold.it/350x150/333333"},
        {img: "http://placehold.it/350x150/666666"},
        {img: "http://placehold.it/350x150/777777"}
    ];
    public serviceItems = [];
    public packageItems = [];
    public cities = [
        {value: 'ncr-0', viewValue: 'Delhi-NCR'},
        {value: 'mumbai-1', viewValue: 'Mumbai'},
        {value: 'bangalore-2', viewValue: 'Bangalore'}
    ];
    public slideConfig = {"slidesToShow": 4, "slidesToScroll": 1, dots: true};
    public slideHListConfig = {"slidesToShow": 8, "slidesToScroll": 1};
    private selectedServices: any;
    private dateUserDetails: any;
    private headerEl: any;
    private btnLoginEl: any;
    private searchWrapEl: any;
    private styleStr = "style";
    private bgStr = "background";

    private dialogRef: MatDialogRef<any>;
    private config: MatDialogConfig;
    private paymentUrlResponse: any;
    private pSub: any;
    private packageSub: any;

    constructor(
        public ropcService: ROPCService,
        private servicesService: ServicesService,
        private _sanitizer: DomSanitizer,
        private dialog: MatDialog,
        private dialogService: DialogService,
    ) {
        this.config = new MatDialogConfig();
        // this.config.backdropClass = "cdk-overlay-custom-backdrop";
        this.config.width = "75%";
        this.config.disableClose = true;
        this.config.panelClass = "dialog-panel-booking";
        this.config.position = {
            bottom: "",
            left: "",
            right: "",
            top: "",
        };

        Instamojo.configure({
            handlers: {
              onClose: this.onInstaCloseHandler.bind(this),
              onSuccess: this.onPaymentSuccessHandler.bind(this),
              onFailure: this.onPaymentFailureHandler.bind(this)
            }
        });
    }
    
    public afterChange(e) {
        console.log('afterChange');
    }

    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.pageYOffset;
        this.headerEl[this.styleStr][this.bgStr] = "rgba(243, 243, 243, " + (scrollPosition - 10)/100 + ")";
        if (scrollPosition > 50) {
            this.headerEl.classList.remove("mh-tp");
        } else if(!this.headerEl.classList.contains("mh-tp")) {
            this.headerEl.classList.add("mh-tp");
        }
        if (scrollPosition >= 212) {
            if (!this.searchWrapEl.classList.contains("fixed")) {
                this.searchWrapEl.classList.add("fixed");
            }
        } else {
            this.searchWrapEl.classList.remove("fixed");
        }
    }

    public ngOnInit() {
        this.searchWrapEl = document.getElementById("searchWrap");
        this.headerEl = document.getElementById("main-header");
        if(!this.headerEl.classList.contains("mh-tp")) {
            this.headerEl.classList.add("mh-tp");
        }
        this.headerEl[this.styleStr][this.bgStr] = "rgba(243, 243, 243, 0)";
        const cWrapEl = document.getElementsByClassName("content-wrapper")[0];
        if (cWrapEl) {
            cWrapEl.classList.add("no-padding");
        }
        this.allSubscriptions = this.servicesService.getServices()
            .subscribe((val) => {
                this.serviceItems = val;
            })
        this.packageSub = this.servicesService.getPackages()
            .subscribe((val) => {
                this.packageItems = val;
            })
    }

    public ngOnDestroy() {
        this.allSubscriptions.unsubscribe();
        if (this.pSub) {
            this.pSub.unsubscribe();
        }
        if (this.packageSub) {
            this.packageSub.unsubscribe();
        }
        const cWrapEl = document.getElementsByClassName("content-wrapper")[0];
        if (cWrapEl) {
            cWrapEl.classList.remove("no-padding");
        }
        this.headerEl[this.styleStr][this.bgStr] = "";
        this.headerEl.classList.remove("mh-tp");
    }

    public getBackground(image) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    }

    public openPackageBookDlg(packageId: number = 0, packageName: string = "") {
        this.dialogRef = this.dialog.open(PackageBookingDialogComponent, this.config);
        // this.dialogRef.componentInstance.serviceItems = this.serviceItems;
        this.dialogRef.componentInstance.selectedServiceId = packageId;
        this.dialogRef.componentInstance.selectedServiceName = packageName;
        this.dialogRef.componentInstance.onBookingCancelled.subscribe(() => {
            console.log("onBookingCancelled()");
            this.dialogRef.close();
        });
        this.dialogRef.componentInstance.onServiceSelected.subscribe((selectedServices) => {
            console.log("onServiceSelected()");
            this.selectedServices = selectedServices;
            this.selectedServices.mainService = this.packageItems.filter((e) => e.id === packageId);
            this.dialogRef.close();
            this.openServiceDateTimeDlg(true);
        });
        // this.dialogRef.afterClosed().subscribe((result) => {
        //     this.dialogRef = null;
        // });
    }

    public openServiceBookDlg(serviceId: number = 0, serviceName: string = "") {
        this.dialogRef = this.dialog.open(BookingDialogComponent, this.config);
        this.dialogRef.componentInstance.serviceItems = this.serviceItems;
        this.dialogRef.componentInstance.selectedServiceId = serviceId;
        this.dialogRef.componentInstance.selectedServiceName = serviceName;
        this.dialogRef.componentInstance.onBookingCancelled.subscribe(() => {
            console.log("onBookingCancelled()");
            this.dialogRef.close();
        });
        this.dialogRef.componentInstance.onServiceSelected.subscribe((selectedServices) => {
            console.log("onServiceSelected()");
            this.selectedServices = selectedServices;
            this.dialogRef.close();
            this.openServiceDateTimeDlg();
        });
        // this.dialogRef.afterClosed().subscribe((result) => {
        //     this.dialogRef = null;
        // });
    }

    public openServiceDateTimeDlg(isForPackage: boolean = false) {
        this.dialogRef = this.dialog.open(DateUserDetailsDialogComponent, this.config);
        this.dialogRef.componentInstance.selectedServices = this.selectedServices;
        this.dialogRef.componentInstance.isForPackage = isForPackage;

        this.dialogRef.componentInstance.onDetailEnteringCancelled.subscribe(() => {
            console.log("onDetailEnteringCancelled()");
            this.dialogRef.close();
        });
        this.dialogRef.componentInstance.onDetailEntered.subscribe((dateUserDetails) => {
            console.log("onDetailEntered()");
            this.selectedServices.dateUserDetails = dateUserDetails;
            this.dialogRef.close();
            // this.getPaymentUrl();
            this.openBookingSummaryDialog(isForPackage);
        });
        // this.dialogRef.afterClosed().subscribe((result) => {
        //     this.dialogRef = null;
        // });
    }

    public openBookingSummaryDialog(isForPackage: boolean = false) {
        this.dialogRef = this.dialog.open(SummaryDialogComponent, this.config);
        this.dialogRef.componentInstance.selectedServices = this.selectedServices;
        this.dialogRef.componentInstance.isForPackage = isForPackage;

        this.dialogRef.componentInstance.onSummaryCancelled.subscribe(() => {
            console.log("onSummaryCancelled()");
            this.dialogRef.close();
        });
        this.dialogRef.componentInstance.onSummaryConfirmed.subscribe(() => {
            console.log("onSummaryConfirmed()");
            this.getPaymentUrl(isForPackage);
            this.dialogRef.close();
            // this.proceedToPayment();
        });
        // this.dialogRef.afterClosed().subscribe((result) => {
        //     this.dialogRef = null;
        // });
    }

    public proceedToPayment() {
        this.openPaymentGateway();
    }

    public proceedToBookingEnd(isSuccess: boolean, response: any) {
        setTimeout(() => {
            Instamojo.close();
            this.dialogRef = this.dialog.open(BookingEndDialogComponent, this.config);
            this.dialogRef.componentInstance.isSuccess = isSuccess;
            this.dialogRef.componentInstance.totalAmount = this.selectedServices.totalAmount;
    
            this.dialogRef.componentInstance.onBookingEndClosed.subscribe(() => {
                console.log("onBookingEndClosed()");
                this.dialogRef.close();
            });
        }, 3000);
        this.pSub = this.servicesService.sendPaymentStatus(response)
            .subscribe((res) => {
                console.log(`sendPaymentStatus:::::${res}`);
            });
        // this.dialogRef.afterClosed().subscribe((result) => {
        //     this.dialogRef = null;
        // });
    }

    public getPaymentUrl(isForPackage: boolean = false) {
        const rUser = this.ropcService.user;
        let emailId: string;
        try {
            emailId = rUser.email ? rUser.email : this.selectedServices.dateUserDetails.contactDetails.email;
        } catch (e) {
            emailId = "sample@abc.com";
        }
        this.selectedServices.userid = rUser.id;
        const payload = {
            name: rUser.username,
            email: emailId,
            phone: rUser.mobile_number,
            currency: "INR",
            amount: this.selectedServices.totalAmount,
            description: "For Novowash Service Booking",
            successUrl: `${location.href}?p=success`,
            failUrl: `${location.href}?p=fail`,
            selectedServices: this.selectedServices,
        };
        if (isForPackage) {
            this.pSub = this.servicesService.getPackagePaymentUrl(payload)
                .subscribe((res) => {
                    this.paymentUrlResponse = res;
                    this.proceedToPayment();
                });
        } else {
            this.pSub = this.servicesService.getPaymentUrl(payload)
                .subscribe((res) => {
                    this.paymentUrlResponse = res;
                    this.proceedToPayment();
                });
        }
    }

    public openPaymentGateway() {
        try {
            Instamojo.open(this.paymentUrlResponse.paymentOptions.paymentUrl);
        } catch (e) {
            console.log("Failed while opening payment gateway");
        }
    }

    public onInstaCloseHandler(){
        try {
            console.log("Model Closed");
        } catch (e) {
            console.log("Failed while opening payment gateway");
        }
    }

    public onPaymentSuccessHandler (response) {
        console.log('Payment Success Response', response);
        this.proceedToBookingEnd(true, response);
    }

      public onPaymentFailureHandler (response) {
        console.log('Payment Failure Response', response);
        this.proceedToBookingEnd(false, response);
       }
}