import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { DialogService } from "./dialog.service";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class DeactivateGuardService implements  CanDeactivate<CanComponentDeactivate> {

  constructor(private dialogService: DialogService) {}

  public canDeactivate(component: CanComponentDeactivate) {
    return true;
  }
}
