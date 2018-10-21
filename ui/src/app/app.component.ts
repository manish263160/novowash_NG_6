import { Component, ViewEncapsulation } from '@angular/core';
import { CommonService } from "./common/services/common.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Novowash App!';
  public constructor (
    public commonService: CommonService,
  ) {}
}
