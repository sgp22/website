import { UrlMapper } from './urlMapper.service';
import { UrlParser } from './urlParser.service';
import { UrlTree } from '@angular/router';

describe('url Mapper', () => {
  let urlMapper: UrlMapper;
  let urlTree: UrlTree;
  let urlIncorrectTree: UrlTree;
  let urlParser: UrlParser;
  let correctPath, inCorrectPath = '';

  beforeEach(() => {
    urlParser = new UrlParser();
    urlMapper = new UrlMapper();
    correctPath = '/develop/iux/1.0.0/adaptive';
    inCorrectPath = '/test/test/develop/tempo/1.0.0/adaptive';
    urlTree = urlParser.parse(correctPath);
    urlIncorrectTree = urlParser.parse(inCorrectPath);
  });

  it('should create map object', (() => {
    expect(urlMapper.map(urlTree)).toBeTruthy();
  }));

  it('should create docs path', (() => {
    expect(urlMapper.map(urlTree)).toContain('/api/docs/');
  }));

  it('should throw err', (() => {
    expect(() => urlMapper.map(urlIncorrectTree)).toThrowError();
  }));

});
