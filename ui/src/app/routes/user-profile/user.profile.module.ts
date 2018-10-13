import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FlexLayoutModule } from "@angular/flex-layout";
import { DialogService } from "../../common/services/dialog.service";
import { SharedModule } from "../../shared.module";
import { UserProfileComponent } from "./user.profile.component";
import { UserProfileRoutes } from "./user.profile.routes";

import { 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
} from "@angular/material";

@NgModule({
    declarations: [
        UserProfileComponent,
    ],
    entryComponents: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserProfileRoutes,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        SharedModule,
    ],
    providers: [],
})

export class UserProfileModule {}