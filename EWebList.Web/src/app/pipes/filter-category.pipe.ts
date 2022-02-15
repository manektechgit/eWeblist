import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {
  transform(items: any, categoryId: number): any {
    if (!items) { return []; }
    if (categoryId == 0) { return items; }
    return items.filter(it => {
      return it.CategoryId == categoryId;
    });
  }

}
