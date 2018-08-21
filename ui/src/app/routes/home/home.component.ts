import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Observable, Subscription } from "rxjs";
import { BookingDialogComponent } from "../../common/components/booking-dialog/booking.dialog.component";
import { DialogService } from "../../common/services/dialog.service";
import { ServicesService } from "../../core/services/services.service";

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
    public cities = [
        {value: 'ncr-0', viewValue: 'Delhi-NCR'},
        {value: 'mumbai-1', viewValue: 'Mumbai'},
        {value: 'bangalore-2', viewValue: 'Bangalore'}
    ];
    public slideConfig = {"slidesToShow": 4, "slidesToScroll": 1};
    public slideHListConfig = {"slidesToShow": 8, "slidesToScroll": 1};
    private headerEl: any;
    private btnLoginEl: any;
    private styleStr = "style";
    private bgStr = "background";

    private dialogRef: MatDialogRef<BookingDialogComponent>;
    private config: MatDialogConfig;

    constructor(
        private servicesService: ServicesService,
        private _sanitizer: DomSanitizer,
        private dialog: MatDialog,
        private dialogService: DialogService,
    ) {
        this.config = new MatDialogConfig();
        this.config.backdropClass = "cdk-overlay-custom-backdrop";
        this.config.width = "75%";
        this.config.disableClose = true;
        this.config.panelClass = "dialog-panel-booking";
        this.config.position = {
            bottom: "",
            left: "",
            right: "",
            top: "",
        };
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
    }

    public ngOnInit() {
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
    }

    public ngOnDestroy() {
        this.allSubscriptions.unsubscribe();
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

    public openServiceBookDlg(serviceId: number = 0) {
        this.dialogRef = this.dialog.open(BookingDialogComponent, this.config);
        this.dialogRef.componentInstance.serviceItems = this.serviceItems;
        this.dialogRef.componentInstance.selectedServiceId = serviceId;
        this.dialogRef.componentInstance.onBookingCancelled.subscribe(() => {
            console.log("onBookingCancelled()");
            this.dialogRef.close();
        });
        this.dialogRef.afterClosed().subscribe((result) => {
            this.dialogRef = null;
        });
    }
}