import { JsDocumentation } from './js-documentation.service';

describe('JsDocumentationService', () => {
  let jsDocumentation: JsDocumentation;

  /**
   * parse()
   */
  describe('should parse documentationjs json', () => {
    const dummyObj = {
      name: 'name',
      constructorComment: {
        tags: 'constructorTags'
      },
      members: {
        instance: [
          {
            name: 'instance',
            description: {
              children: [
                {
                  children: [
                    { value: 'value'}
                  ]
                }
              ]
            },
            tags: [
              {
                title: 'param',
                name: 'tagName',
                description: 'tagDescription',
                type: {
                  name: 'tagTypeName'
                }
              }
            ]
          },
        ]
      }
    };

    let result: object;

    beforeEach(() => {
      jsDocumentation = new JsDocumentation();
      result = jsDocumentation.parse(dummyObj);
    });


    it('and set the name property', () => {
      expect(result['name']).toBe('name');
    });

    it('and set tag properties', () => {
      expect(result['constructorTags']).toBe('constructorTags');
    });

    it('and set method properties', () => {
      expect(result['methods']).toEqual([{
        name: 'instance',
        info: 'value',
        params: [
          {
            paramName: 'tagName',
            paramDescription: 'tagDescription',
            paramType: 'tagTypeName'
          }
        ]
      }]);
    });
  });
});
