import { Component, EventEmitter, OnDestroy, OnInit, Input, Output, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription, Subscriber } from "rxjs";
import { CommonService } from "../../../common/services/common.service";
import { ValidatorService } from "../../../common/services/validator.service";
import { Address } from "../../../model/address";

@Component({
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:use-host-property-decorator
    selector: "address-change-dialog",
    styleUrls: ["../booking.dialog.component.scss"],
    templateUrl: "address.change.dialog.component.html",
})
export class AddressChangeDialogComponent implements OnDestroy, OnInit {
    @Input() selectedService: any;
    @Output() public onAddressChangeCancelled: EventEmitter<any> = new EventEmitter();
    @Output() public onAddressChanged: EventEmitter<any> = new EventEmitter();
    public allSubscriptions: Subscription;
    public addressForm: FormGroup;
    public cities: any[];
    
    constructor(
        public commonService: CommonService,
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.loadCities();
        this.initAddressForm();
        this.parseAndPatchAddress();
    }

    ngOnDestroy() {
        if (this.allSubscriptions) {
            this.allSubscriptions.unsubscribe();
        }
    }

    public loadCities() {
        this.cities = [
            {value: 'ncr-0', viewValue: 'Delhi-NCR'},
            {value: 'mumbai-1', viewValue: 'Mumbai'},
            {value: 'bangalore-2', viewValue: 'Bangalore'}
        ];
    }

    public initAddressForm() {
        this.addressForm = this.fb.group({
            addressLine: ["", Validators.compose([ Validators.required ])],
            landmark: [""],
            city: ["", Validators.compose([ Validators.required ])],
            pincode: [null, Validators.compose([ Validators.required, Validators.pattern("^[1-9][0-9]{5}$") ])],
        });
    }

    public parseAndPatchAddress() {
        try {
            const addr = JSON.parse(this.selectedService.userAddress);
            this.addressForm.patchValue(addr);
        } catch (e) {} 
    }

    public getCityName() {
        let cityName = "";
        const selectedCity = this.cities.filter(city => city.value === this.addressForm.controls.city.value);
        if (selectedCity && selectedCity.length) {
            cityName = selectedCity[0].viewValue;
        }
        return cityName;
    }

    public submitAddress() {
        this.onAddressChanged.emit(JSON.stringify(this.addressForm.value));
    }

    public closeDialog() {
        this.onAddressChangeCancelled.emit();
    }
}

/* tslint:enable */
