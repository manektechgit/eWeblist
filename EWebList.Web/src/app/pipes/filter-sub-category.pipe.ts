import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSubCategory'
})
export class FilterSubCategoryPipe implements PipeTransform {
  transform(items: any, subCategoryId: number): any {
    if (!items) { return []; }
    if (subCategoryId == 0) { return items; }
    return items.filter(it => {
      return it.SubCategoryId == subCategoryId;
    });
  }

}
