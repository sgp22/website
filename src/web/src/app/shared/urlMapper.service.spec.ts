import { UrlMapper } from './urlMapper.service';
import { UrlParser } from './urlParser.service';
import { UrlTree } from '@angular/router';

describe('UrlMapperService', () => {
  let urlMapper: UrlMapper;
  let urlTree: UrlTree;
  let urlParser: UrlParser;
  let correctPath;

  beforeEach(() => {
    urlParser = new UrlParser();
    urlMapper = new UrlMapper();
    correctPath = 'cats/dogs/v9999/test';
    urlTree = urlParser.parse(correctPath);
  });

  it('should create map object', (() => {
    expect(urlMapper.map(urlTree)).toBeTruthy();
  }));

  it('should create docs path', (() => {
    expect(urlMapper.map(urlTree)).toContain('api/docs/dogs/v9999/docs/test.json');
  }));

});
