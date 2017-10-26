import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';

@Injectable()
export class UrlMapper {
  map(tree: UrlTree): string {
    const segments = tree.root.children.primary.segments;
    const paths = [];

    if (segments.length !== 4) {
      throw new Error('Unexpected path segments: expected 4');
    }

    for (let i = 0; i < segments.length; i++) {
      paths[i] = segments[i].path;
    }

    let libName, version, compName = '';

    if (paths[1] === 'tempo') {
      libName = 'iux';
    } else {
      libName = paths[1];
    }

    if (paths[2]) {
      version = paths[2];
    }

    if (paths[3]) {
      compName = paths[3];
    }

    const mapPath = `/api/docs/${version}/${compName}.json`;
    return mapPath;
  }
}
