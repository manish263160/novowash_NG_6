import { animate, group, state, style, transition, trigger } from "@angular/animations";
import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Input, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatIcon, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from "@angular/router";
import { ValidatorService } from "../../services/validator.service";
import { Observable, Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { DialogService } from "../../../common/services/dialog.service";
import { ServicesService } from "../../../core/services/services.service";
import { User } from "../../../model/user";

@Component({
    animations: [

        trigger("headerBackButton", [
            state("in" , style({ opacity: 1, transform: "scale(1)" })),
            transition(":enter", [
                style({ opacity: 0, transform: "scale(0)" }),
                group([
                    animate("500ms ease-in-out", style({opacity: "1", transform: "scale(1)"})),
                ]),

            ]),
            transition(":leave", [
                style({ opacity: 0.5 }),
                group([
                    animate("400ms ease-in-out", style({opacity: "0"})),
                ]),

            ]),
        ]),

        trigger("firstSlideHeader", [
            state("in" , style({ opacity: 1 })),
            transition(":enter", [
                style({ opacity: 0.2 }),
                group([
                    animate("200ms 200ms ease-in-out", style({opacity: "1"})),
                ]),

            ]),
            transition(":leave", [
                style({ opacity: 0.5 }),
                group([
                    animate("400ms ease-in-out", style({opacity: "0"})),
                ]),

            ]),
        ]),

        trigger("secondSlideHeader", [
            state("in" , style({ opacity: 1 })),
            transition(":enter", [
                style({ opacity: 0 }),
                group([
                    animate("200ms 400ms ease-in-out", style({opacity: "1"})),
                ]),

            ]),
            transition(":leave", [
                style({ opacity: 0.2 }),
                group([
                    animate("100ms ease-in-out", style({opacity: "0"})),
                ]),

            ]),
        ]),

        trigger("firstSlide", [
            state("in" , style({ transform: "translateY(0%)", opacity: 1 })),
            transition(":leave", [
                style({ transform: "translateY(0%)", opacity: 1 }),

                group([
                    animate(800, style({ transform: "translateY(-80%)" })),
                    animate("400ms ease-in-out", style({opacity: "0"})),
                ]),

            ]),
        ]),

        trigger("secondSlide", [
            state("in" , style({ opacity: 0 })),
            transition(":enter", [
                style({ opacity: 0 }),

                group([
                    animate("100ms ease-in-out", style({opacity: "1"})),
                ]),

            ]),
        ]),
    ],
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:use-host-property-decorator
    selector: "booking-dialog",
    templateUrl: "booking.dialog.component.html",
})
export class BookingDialogComponent implements OnDestroy, OnInit {
    @Input() public serviceItems = [];
    @Input() public selectedServiceId: number;
    @Output() public onBookingCancelled: EventEmitter<any> = new EventEmitter();
    public allSubscriptions: Subscription;
    public subList = [];
    public slide: number = 1;
    
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
    }

    public loadSubServices() {
        if (this.selectedServiceId) {
            const subServiceSub = this.servicesService.getSubServices(this.selectedServiceId)
                .subscribe((val) => {
                    this.subList = val;
                });
            if (this.allSubscriptions) {
                this.allSubscriptions.add(subServiceSub);
            } else {
                this.allSubscriptions = subServiceSub;
            }
        }
    }

    public onClickMainService(serviceId){
        this.selectedServiceId = serviceId;
        this.loadSubServices();
    }

    public getBackground(image) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    }

    public backButtonClicked() {

    }

    public closeDialog() {
        this.onBookingCancelled.emit();
    }
}

/* tslint:enable */
