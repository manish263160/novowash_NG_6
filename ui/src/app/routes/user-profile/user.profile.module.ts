import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FlexLayoutModule } from "@angular/flex-layout";
import { DialogService } from "../../common/services/dialog.service";
import { AddressChangeDialogComponent } from "../../common/components/address-change-dialog/address.change.dialog.component";
import { DateSelectDialogComponent } from "../../common/components/date-select-dialog/date.select.dialog.component";
import { SharedModule } from "../../shared.module";
import { NnovoCurlBracketRemoverPipe, NovoUserAddressPipe, UserProfileComponent } from "./user.profile.component";
import { UserProfileRoutes } from "./user.profile.routes";

import { 
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
} from "@angular/material";

@NgModule({
    declarations: [
        UserProfileComponent,
        NovoUserAddressPipe,
        NnovoCurlBracketRemoverPipe,
    ],
    entryComponents: [
        AddressChangeDialogComponent,
        DateSelectDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserProfileRoutes,
        FlexLayoutModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        SharedModule,
    ],
    providers: [],
})

export class UserProfileModule {}