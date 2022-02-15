import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements OnInit, OnChanges {

  @Input() public passwordToCheck: string;
  lowerLetters = false;
  upperLetters = false;
  numbers = false;
  symbols = false;


  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    this.checkStrength(password);

  }


  checkStrength(p) {
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    this.lowerLetters = /[a-z]+/.test(p);
    this.upperLetters = /[A-Z]+/.test(p);
    this.numbers = /[0-9]+/.test(p);
    this.symbols = regex.test(p);
  }
}
