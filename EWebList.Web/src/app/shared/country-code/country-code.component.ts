import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { CountryCode } from 'src/app/_models/country-code';

@Component({
  selector: 'app-country-code',
  templateUrl: './country-code.component.html',
  styleUrls: ['./country-code.component.css']
})
export class CountryCodeComponent {

  private _isShowListCountryFlags = false;
  set isShowListCountryFlags(value: boolean) {
    this._isShowListCountryFlags = value;
    this.changeDetectorRef.markForCheck();
  }
  get isShowListCountryFlags(): boolean {
    return this._isShowListCountryFlags;
  }

  @Input() selectedCountryCode: string;
  @Input() countryCodes: CountryCode;

  @Input() customLabels: Record<string, string>;

  @Input() showFlags = true;
  @Input() showLabels = true;
  @Input() showArrow = true;

  @Output() changedCountryCode = new EventEmitter<CountryCode>();

  @ViewChild('selectFlags') selectFlagsElementRef: ElementRef;

  outsideClickSelectFlags = () => { };

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  getCountryLabel(countryCode: string): string {
    return (this.customLabels && this.customLabels[countryCode]) ?
      this.customLabels[countryCode] :
      countryCode ? countryCode.toUpperCase() : '';
  }

  public toggleListCountryFlags(): void {
    if (this.isShowListCountryFlags) {
      this.closeListCountryFlags();
    } else {
      this.openListCountryFlags();
    }
  }

  private openListCountryFlags(): void {
    this.isShowListCountryFlags = true;
    this.subscribeOutsideClickSelectFlags();
  }

  private closeListCountryFlags(): void {
    this.isShowListCountryFlags = false;
    this.unsubscribeOutsideClickSelectFlags();
  }

  public changeSelectedCountryCode(value: CountryCode): void {
    this.selectedCountryCode = value.AlphaCode.toString();
    this.closeListCountryFlags();
    this.changedCountryCode.emit(value);
  }

  private subscribeOutsideClickSelectFlags(): void {
    this.outsideClickSelectFlags = this.renderer.listen('document', 'click', (event) => {
      if (!this.selectFlagsElementRef.nativeElement.contains(event.target)) {
        this.closeListCountryFlags();
      }
    });
  }

  private unsubscribeOutsideClickSelectFlags(): void {
    if (this.outsideClickSelectFlags) {
      this.outsideClickSelectFlags();
      this.outsideClickSelectFlags = undefined;
    }
  }
}
