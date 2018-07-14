import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { DialogService } from "../../common/services/dialog.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "home-component",
    styleUrls: ["./home.component.scss"],
    templateUrl: "./home.component.html",
})

export class HomeComponent implements OnInit, OnDestroy {
    public slides = [
        {img: "http://placehold.it/350x150/000000"},
        {img: "http://placehold.it/350x150/111111"},
        {img: "http://placehold.it/350x150/777777"},
        {img: "http://placehold.it/350x150/333333"},
        {img: "http://placehold.it/350x150/666666"},
        {img: "http://placehold.it/350x150/777777"}
    ];
    public cities = [
        {value: 'ncr-0', viewValue: 'Delhi-NCR'},
        {value: 'mumbai-1', viewValue: 'Mumbai'},
        {value: 'bangalore-2', viewValue: 'Bangalore'}
    ];
    public slideConfig = {"slidesToShow": 4, "slidesToScroll": 1};
    
    public afterChange(e) {
        console.log('afterChange');
    }

    public ngOnInit() {
        const cWrapEl = document.getElementsByClassName("content-wrapper")[0];
        if (cWrapEl) {
            cWrapEl.classList.add("no-padding");
        }
    }

    public ngOnDestroy() {}
}