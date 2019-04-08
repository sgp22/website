import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortSidebar'
})
export class SortSidebarPipe implements PipeTransform {

  transform(array: any, field: string): any {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {

      // Top level items the menu_order is underneath meta
      if (a['meta'] && b['meta']) {
        if (a['meta']['menu_order'] === 0 && b['meta']['menu_order'] === 0) {
          if (a[field] < b[field]) {
            return -1;
          } else if (a[field] > b[field]) {
            return 1;
          } else {
            return 0;
          }
        }
        if (a['meta']['menu_order'] > b['meta']['menu_order']) {
          return 1;
        } else {
          return -1;
        }
      }

      if (a['menu_order'] === 0 && b['menu_order'] === 0) {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        } else {
          return 0;
        }
      }
      if (a['menu_order'] > b['menu_order']) {
        return 1;
      } else {
        return -1;
      }

    });

    return array;
  }

}
