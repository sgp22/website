import { Injectable } from '@angular/core';

@Injectable()
export class Comments {
  parse(docComments: any) {
    // Not worrying about nesting yet as API, will probably be new Comp.method, not new.Comp.method.anotherMethod

    const comments = {};
    if (docComments) {

      comments['name'] = docComments.name;
      if (docComments.constructorComment) {
        comments['constructorTags'] = docComments.constructorComment.tags;
      }

      // Parse first level
      if (docComments.members.instance.length) {
        comments['methods'] = docComments.members.instance.map(data => {
          const methods = {};
          methods['name'] = data.name;

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

          methods['info'] = data.description.children[0].children[0].value;
          return methods;
        });
      }
    }

    return comments;
  }

}
