import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router } from "@angular/router";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "about-us",
    styleUrls: ["./about-us.component.scss"],
    templateUrl: "./about-us.component.html",
})

export class AboutUsComponent implements OnInit, OnDestroy {
    public founders: any[];

    constructor(
        private router: Router,
        private _sanitizer: DomSanitizer,
    ) {}

    public ngOnInit() {
        this.founders = [{
            imageUrl: "assets/img/team/1.jpg",
            name: "Rohan Deshmukh",
            designation: "Founder",
            institute: "IIT Bombay",
            url: "https://www.linkedin.com/in/rohandeshmukh7",
        }, {
            imageUrl: "assets/img/team/2.jpg",
            name: "Anudeep Jain",
            designation: "Founder",
            institute: "CA,CFA",
            url: "https://www.linkedin.com/in/anudeep-jain-2a347a57",
        }];
    }

    public getBackground(image) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    }

    public ngOnDestroy() {}
}