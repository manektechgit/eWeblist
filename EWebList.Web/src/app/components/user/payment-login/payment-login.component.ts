import { Component, OnInit } from '@angular/core';
import { AppJsPath } from 'src/app/_app-constants/app-constants.config';
declare var $: any;
@Component({
  selector: 'app-payment-login',
  templateUrl: './payment-login.component.html',
  styleUrls: ['./payment-login.component.css']
})
export class PaymentLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
  }

}
