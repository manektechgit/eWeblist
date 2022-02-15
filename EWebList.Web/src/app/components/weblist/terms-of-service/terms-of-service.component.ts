import { Component, OnInit } from '@angular/core';
import { AppJsPath } from 'src/app/_app-constants/app-constants.config';
declare var $: any;
@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html'
})
export class TermsOfServiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
  }
}
