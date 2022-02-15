import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deSlugify'
})
export class DeSlugifyPipe implements PipeTransform {

  transform(str: string): string {
    return this.isString(str)
      ? str.replace('-', ' ')
      : str;
  }
  isString(value: any) {
    return typeof value === 'string';
  }

}
