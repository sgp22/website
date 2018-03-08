import { Injectable } from '@angular/core';

@Injectable()

export class JsDocumentation {

  parse(jsDocumentation: any) {
    // Not worrying about nesting yet as API, will probably be new Comp.method, not new.Comp.method.anotherMethod

    const docObj = {};

    if (jsDocumentation) {

      docObj['name'] = jsDocumentation.name;

      if (jsDocumentation.constructorComment) {
        docObj['constructorTags'] = jsDocumentation.constructorComment.tags;
      }

      // Parse first level
      if (jsDocumentation.members.instance.length) {

        docObj['methods'] = jsDocumentation.members.instance.map(data => {
          const methods = {
            name: data.name,
            info: data.description.children[0].children[0].value
          };

          if (data.tags) {
            methods['params'] = [];
            for (const i in data.tags) {
              if (data.tags[i].title === 'param') {
                methods['params'].push({
                  paramName: data.tags[i].name,
                  paramDescription: data.tags[i].description,
                  paramType: data.tags[i].type.name
                });
              }
            }
          }
          return methods;
        });

      }

      // Parse first level
      if (jsDocumentation.properties.length) {

        docObj['settings'] = jsDocumentation.properties.map(data => {
          const settings = {
            name: data.name,
            info: data.description.children[0].children[0].value,
            type: data.type.name
          };

          return settings;
        });

      }

    }
    return docObj;
  }
}
