import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ContentChildren,
  QueryList
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-component-loader',
  templateUrl: './component-loader.component.html'
})
export class ComponentLoaderComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) dynamicPlaceholder;
  dynamicComponent: ContainerComponent[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {}

  loadComponent(pageType: string, slug, template, data) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContainerComponent);
    const viewContainerRef = this.dynamicPlaceholder._data.viewContainer;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const instance: ContainerComponent = componentRef.instance as ContainerComponent;
    instance.pageType = pageType;
    instance.slug = slug;
    instance.template = template;
    instance.dataContext = data;
    this.dynamicComponent.push(instance);
    this.activeComponent(this.dynamicComponent[this.dynamicComponent.length - 1]);
  }

  activeComponent(component: ContainerComponent) {
    this.dynamicComponent.forEach(comp => (comp.active = false));
    component.active = true;
  }

}
