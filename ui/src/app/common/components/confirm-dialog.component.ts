import { Component, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "confirm-dialog",
    template: `
        <div style="padding: 22px 28px;">
            <h4 style="margin: 0">{{ title }}</h4>
            <h6 style="margin: 18px 0;">{{ message }}</h6>
            <br/>
            <button type="button" mat-raised-button color="primary"
                    (click)="dialogRef.close(true)" class="btn-dialog-confirm">
                {{ acceptButtonLabel }}
            </button>
            <button *ngIf="declineButtonLabel && declineButtonLabel.length" type="button" mat-button (click)="dialogRef.close(false)">
                {{ declineButtonLabel }}
            </button>
        </div>
    `,
})
export class ConfirmDialogComponent {

    public title: string;
    public message: string;
    public acceptButtonLabel: string;
    public declineButtonLabel: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {

    }
}
