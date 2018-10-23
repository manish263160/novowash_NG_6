import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared.module";
import { BeAPartnerComponent } from "./beapartner.component";
import { BeAPartnerRoutes } from "./beapartner.routes";

import { 
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
} from "@angular/material";

@NgModule({
    declarations: [
        BeAPartnerComponent,
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BeAPartnerRoutes,
        FlexLayoutModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        SharedModule,
    ],
    providers: [
    ],
})

export class BeAPartnerModule {}