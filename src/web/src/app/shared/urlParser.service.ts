import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { UrlSerializer } from '@angular/router';
import { DefaultUrlSerializer } from '@angular/router';
import { UrlTree } from '@angular/router';

@Injectable()
export class UrlParser implements UrlSerializer {
  constructor(
    private location: Location
  ) {}

  parse(url: string): UrlTree {
    const serializer = new DefaultUrlSerializer();
    const normalizedUrl = this.location.normalize(url);
    const parseUrlTree = serializer.parse(normalizedUrl);

    if (parseUrlTree.root.children.primary.segments.length > 2) {
      return parseUrlTree;
    } else {
      console.error('URL is incorrect: ', url);
      throw(parseUrlTree);
    }
  }

  serialize(tree: UrlTree): string {
    const serializer = new DefaultUrlSerializer();
    const serializedPath = serializer.serialize(tree);
    return serializedPath;
  }
}
