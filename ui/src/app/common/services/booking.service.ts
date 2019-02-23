import { ROPCService } from './../../auth/ropc.service';
import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { BookingDialogComponent } from '../components/booking-dialog/booking.dialog.component';
import { DateUserDetailsDialogComponent } from '../components/date-user-details-dialog/date.user.details.dialog.component';
import { SummaryDialogComponent } from '../components/summary-dialog/summary.dialog.component';
import { ServicesService } from '../../core/services/services.service';
import { BookingEndDialogComponent } from '../components/booking-end-dialog/booking.end.dialog.component';
import { Subscription } from 'rxjs';
import { DialogService } from './dialog.service';

declare var Instamojo: any;

@Injectable()
export class BookingService {
  private dialogRef: MatDialogRef<any>;
  private config: MatDialogConfig;
  public serviceItems = [];
  private selectedServices: any;
  private pSub: any;
  private paymentUrlResponse: any;
  public allSubscriptions: Subscription;

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    public ropcService: ROPCService,
    private servicesService: ServicesService,) {
      this.allSubscriptions = this.servicesService.getServices()
      .subscribe((val) => {
          this.serviceItems = val;
      })
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
      const isCanceled = true;
    this.submitCashOndelivery(isCanceled, isForPackage);
      this.dialogRef.close();
  });
  this.dialogRef.componentInstance.onSummaryConfirmed.subscribe(() => {
      console.log("onSummaryConfirmed()");
      this.getPaymentUrl(isForPackage);
      this.dialogRef.close();
      // this.proceedToPayment();
  });
  this.dialogRef.componentInstance.onCashOndelivery.subscribe(() => {
    console.log("onCashOndelivery()");
    const isCanceled = false;
    this.submitCashOndelivery(isCanceled, isForPackage);
    this.dialogRef.close();
    // this.proceedToPayment();
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
      paymentMode: 'ONLINE',
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

public proceedToPayment() {
  this.openPaymentGateway();
}

public openPaymentGateway() {
    try {
        Instamojo.open(this.paymentUrlResponse.longurl);
    } catch (e) {
        console.log("Failed while opening payment gateway");
    }
}

public submitCashOndelivery(isCanceled: boolean = false, isForPackage: boolean = false) {
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
        paymentMode: isCanceled ? 'CANCELED' : 'CASHON_DELIVERY',
    };
    if (isForPackage) {
        this.pSub = this.servicesService.getPackagePaymentUrl(payload)
            .subscribe((res) => {
            if(!isCanceled){
                this.dialogRef = this.dialog.open(BookingEndDialogComponent, this.config);
                // if(res.status === 'SUCCESS')
                this.dialogRef.componentInstance.isSuccess = true;
                this.dialogRef.componentInstance.totalAmount = this.selectedServices.totalAmount;
                this.dialogRef.componentInstance.isChashOn = true;
                this.dialogRef.componentInstance.onBookingEndClosed.subscribe(() => {
                    console.log("onBookingEndClosed()");
                    this.dialogRef.close();
                });
              }
            });
    } else {
        this.pSub = this.servicesService.getPaymentUrl(payload)
            .subscribe((res) => {
            if(!isCanceled){
                this.dialogRef = this.dialog.open(BookingEndDialogComponent, this.config);
                // if(res.status === 'SUCCESS')
                this.dialogRef.componentInstance.isSuccess = true;
                this.dialogRef.componentInstance.totalAmount = this.selectedServices.totalAmount;
                this.dialogRef.componentInstance.isChashOn = true;
                this.dialogRef.componentInstance.onBookingEndClosed.subscribe(() => {
                    console.log("onBookingEndClosed()");
                    this.dialogRef.close();
                });
              }
            });
    }
}

}
