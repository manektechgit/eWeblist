import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {
  transform(items: any, term: string): any {
    if (!items) { return []; }
    if (term === '') { return items; }
    return items.filter(it => {
      return it.Email.toLowerCase().includes(term.toLowerCase()) ||
      it.RegistrationName.toLowerCase().includes(term.toLowerCase()) ||
      it.ContactNo.toLowerCase().includes(term.toLowerCase());
    });
  }

}
