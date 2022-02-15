import { Component, OnInit } from '@angular/core';
import { AppJsPath } from 'src/app/_app-constants/app-constants.config';
declare var $: any;
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html'
})
export class PrivacyPolicyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
  }

}
