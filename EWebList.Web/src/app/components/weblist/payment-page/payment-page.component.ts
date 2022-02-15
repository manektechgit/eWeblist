import { Component, OnInit } from '@angular/core';
import { AppJsPath } from 'src/app/_app-constants/app-constants.config';

declare var $: any;
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
  }
}
