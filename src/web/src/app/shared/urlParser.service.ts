import { Injectable } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { DefaultUrlSerializer } from '@angular/router';
import { UrlTree } from '@angular/router';

@Injectable()
export class UrlParser implements UrlSerializer {
  constructor() {}

  parse(url: string): UrlTree {
    const serializer = new DefaultUrlSerializer();
    const parseUrlTree = serializer.parse(url);

    if (parseUrlTree.root.children.primary.segments.length > 2) {
      return parseUrlTree;
    } else {
      throw new Error(`URL is incorrect: use relative path, not ${url}`);
    }
  }

  serialize(tree: UrlTree): string {
    const serializer = new DefaultUrlSerializer();
    const serializedPath = serializer.serialize(tree);
    return serializedPath;
  }
}
