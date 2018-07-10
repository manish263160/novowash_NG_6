import { EventEmitter, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ConfirmDialogComponent } from "../components/confirm-dialog.component";
import { ErrorDialogComponent } from "../components/error.dialog.component";

@Injectable()
export class DialogService {

    constructor(private dialog: MatDialog, private router: Router) {}

    public confirm(title: string, message: string, acceptButtonLabel: string = "Ok", declineButtonLabel: string = "Cancel"): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmDialogComponent>;

        dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.acceptButtonLabel = acceptButtonLabel;
        dialogRef.componentInstance.declineButtonLabel = declineButtonLabel;

        return dialogRef.afterClosed();
    }

    public confirmv2(title: string, message: string, form: FormGroup,
                     hasPermission: boolean, compDialogRef: any,
                     event: EventEmitter<any> = null, acceptButtonLabel: string = "Ok",
                     declineButtonLabel: string = "Cancel"): void | Observable<boolean> {
        if (form && form.dirty) {
            let dialogRef: MatDialogRef<ConfirmDialogComponent>;
            dialogRef = this.dialog.open(ConfirmDialogComponent);
            dialogRef.componentInstance.title = title;
            dialogRef.componentInstance.message = message;
            dialogRef.componentInstance.acceptButtonLabel = acceptButtonLabel;
            dialogRef.componentInstance.declineButtonLabel = declineButtonLabel;
            if (compDialogRef) {
                const sub$ = dialogRef.afterClosed().subscribe((result) => {
                        if (result) {
                            if (event) {
                                event.emit();
                            } else {
                                compDialogRef.close();
                            }
                        }
                        sub$.unsubscribe();
                    });
            } else {
                event.emit();
                return dialogRef.afterClosed();
            }
        } else if (compDialogRef && !event) {
            compDialogRef.close();
        } else {
            if (event) {
                event.emit();
            }
        }
    }

    public error(title: string, messages: string[]): Observable<boolean> {

        let dialogRef: MatDialogRef<ErrorDialogComponent>;
        const config: MatDialogConfig = new MatDialogConfig();
        config.backdropClass = "cdk-overlay-custom-backdrop";
        config.disableClose = true;
        config.width = "75%";
        config.panelClass = "dialog-panel";
        config.position = {
            bottom: "",
            left: "",
            right: "",
            top: "",
        };
        dialogRef = this.dialog.open(ErrorDialogComponent, config);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.messages = messages;

        return dialogRef.afterClosed();
    }

    /**
     * Usage: this.dialogService.showMultiStepDialog("new-role", this.route, {id: 0});
     *
     * @param {string} routeName
     * @param {ActivatedRoute} route
     * @param data
     */
    public showMultiStepDialog(routeName: string, route: ActivatedRoute, data: any) {
        return this.router.navigate([
            {
                outlets: {
                    dialog: [routeName, data],
                },
            },
        ], {relativeTo: route}).then(() => {
            //
        });
    }

    /**
     * Usage: this.dialogService.hideMultiStepDialog("../roles", this.route);
     *
     * @param {string} routeName
     * @param {ActivatedRoute} route
     * @param data
     */
    public hideMultiStepDialog(routeName: string, route: ActivatedRoute, data?: any) {
        return this.router.navigate([routeName], {relativeTo: route.parent});
    }
}
