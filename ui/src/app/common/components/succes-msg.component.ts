import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  template: `
  <div fxFlex="flex" fxLayout="column" class="container">
  <h3>Thank you. We will get back to you soon.</h3>
  </div>
`,
styles: ['']
})
export class SuccesMsgComponent {}
