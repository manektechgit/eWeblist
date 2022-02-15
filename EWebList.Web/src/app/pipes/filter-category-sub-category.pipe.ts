import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategoryBySubCategory'
})
export class FilterCategorySubCategoryPipe implements PipeTransform {
  transform(items: any, term: string): any {
    if (!items) { return []; }
    if (term === '') { return items; }
    return items.filter(it => {
      return it.Name.toLowerCase().includes(term.toLowerCase());
    });
  }

}
