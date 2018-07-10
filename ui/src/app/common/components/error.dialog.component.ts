import { Component, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "error-dialog",
    styleUrls: ["./error.dialog.component.scss"],
    templateUrl: "./error.dialog.component.html",
})
export class ErrorDialogComponent {

    public title: string = "";
    public messages: string[] = [];

    constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>) {

    }
}
