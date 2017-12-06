import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';

@Injectable()
export class UrlMapper {

  map(tree: UrlTree): string {
    const segments = tree.root.children.primary.segments;
    let libName, version, compName = '';

    if (segments[1].path && segments[2].path) {
      libName  = segments[1].path;
      version  = segments[2].path;
      compName = (segments[3] ? segments[3].path : 'index');
    } else {
      throw new Error('Incorrect URL: Missing UrlTree segments');
    }

    return `api/docs/${libName}/${version}/docs/${compName}.json`;
  }
}
