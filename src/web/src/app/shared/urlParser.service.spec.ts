import { UrlParser } from './urlParser.service';
import { UrlTree } from '@angular/router';

describe('UrlParserService', () => {
  let urlParser: UrlParser;
  let urlTree: UrlTree;
  let correctPath = '';
  let inCorrectPath = '';


  beforeEach(() => {
    urlParser = new UrlParser();
    correctPath = '/develop/tempo/1.0.0/adaptive';
    inCorrectPath = 'http://docs-site-staging.us-east-1.elasticbeanstalk.com/api/docs/1.0.0/adaptive.json';
    urlTree = urlParser.parse(correctPath);
  });

  it('should create object', (() => {
    expect(urlTree).toBeTruthy();
  }));

  it('should be 4 segments in length', (() => {
    urlTree = urlParser.parse(correctPath);
    expect(urlTree.root.children.primary.segments.length).toEqual(4);
  }));

  it('should have segment[0].path === "develop"', (() => {
    urlTree = urlParser.parse(correctPath);
    expect(urlTree.root.children.primary.segments[0].path).toBe('develop');
  }));

  it('should have segment[1].path === "tempo"', (() => {
    urlTree = urlParser.parse(correctPath);
    expect(urlTree.root.children.primary.segments[1].path).toBe('tempo');
  }));

  it('should have segment[2].path === "1.0.0"', (() => {
    urlTree = urlParser.parse(correctPath);
    expect(urlTree.root.children.primary.segments[2].path).toBe('1.0.0');
  }));

  it('should have segment[3].path === "adaptive"', (() => {
    urlTree = urlParser.parse(correctPath);
    expect(urlTree.root.children.primary.segments[3].path).toBe('adaptive');
  }));

  it('should throw err', (() => {
    expect(() => urlParser.parse(inCorrectPath)).toThrowError();
  }));

  it('should serialize, urlTree -> path string', (() => {
    urlTree = urlParser.parse(correctPath);
    expect(urlParser.serialize(urlTree)).toBe(correctPath);
  }));
});
