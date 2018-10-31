import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Subscription } from "rxjs";
import { ValidatorService } from "../../common/services/validator.service";
import { ServicesService } from "../../core/services/services.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "be-a-partner",
    styleUrls: ["./beapartner.component.scss"],
    templateUrl: "./beapartner.component.html",
})

export class BeAPartnerComponent implements OnInit, OnDestroy {
    public partnerForm: FormGroup;
    public allSubscriptions: Subscription;
    public rgexString: string = "a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð";
    public namePattern = new RegExp("^[" + this.rgexString + ",.'-]+([" + this.rgexString + " ,.'-]+)*$");
    public emailPattern = "^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))$";

    public filteredOptions = [];

    private searchSub: any;
    private serviceMasterId: any;
    private serviceName: string;

    private submit: Subscription;

    constructor(
        public snackBar: MatSnackBar,
        private fb: FormBuilder,
        private _sanitizer: DomSanitizer,
        private servicesService: ServicesService,
    ) {}

    public ngOnInit() {
        console.log("Login ngOnInit()....");
        this.initPartnerForm();
    }

    public initPartnerForm() {
        this.partnerForm = this.fb.group({
            // email: ["", Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
            name: ["", Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
            number: ["", Validators.compose([Validators.required, ValidatorService.phoneValidator])],
            service: ["", Validators.compose([Validators.required])],
        });
    }

    public submitPartnerForm() {
      if (this.partnerForm.invalid) {
        return;
    }
      console.log("this.partnerForm==",this.partnerForm.value);

      const payload ={
        partnerName: this.partnerForm.value.name ? this.partnerForm.value.name : '',
        serviceMasterId: this.serviceMasterId ,
        serviceName: this.serviceName ,
        contactNumber: this.partnerForm.value.number ? this.partnerForm.value.number : '',
      }

      this.submit = this.servicesService.submitBEApartner(payload)
            .subscribe((res) => {
                console.log(`RES from help register:::: res==`,res);
              if(res.status === 'SUCCESS'){

                this.openSnackBar("Thank you for your interest. We will get back to you soon.", "success");
              }
            });
    }

    public onSearchItemClicked(event) {
        //
        console.log("event==",event);
        this.serviceMasterId = event.option.value.id;
        this.serviceName = event.option.value.serviceName;
    }

    public getSearchResult(searchText) {
        const filterValue = searchText.toLowerCase();
        if (filterValue && filterValue.length > 0) {
            this.searchSub = this.servicesService.getSearchResult(filterValue)
                .subscribe((val) => {
                    this.filteredOptions = val;
                })
        }
    }

    public displayWithSearch(service) {
        return service ? service.serviceName : "";
    }

    public getBackground(image) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    }

    public ngOnDestroy() {
        if (this.allSubscriptions) {
            this.allSubscriptions.unsubscribe();
        }
        if (this.searchSub) {
            this.searchSub.unsubscribe();
        }
    }

    public openSnackBar(message: string, panelClass:string = "", action: string = "") {
        this.snackBar.open(message, action, {
          duration: 2000,
          panelClass: panelClass,
        });
    }
}
