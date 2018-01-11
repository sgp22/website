import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ContentChildren,
  QueryList,
  Input,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerComponent } from '../container/container.component';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-component-loader',
  templateUrl: './component-loader.component.html',
  providers: [PagesService]
})
export class ComponentLoaderComponent implements AfterViewInit, OnInit {
  @ViewChild('container', { read: ViewContainerRef }) dynamicPlaceholder;
  array = [];
  dynamicComponent: ContainerComponent[] = [];
  globalNav;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() { }

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
    const activeComp = this.dynamicComponent.find(comp => comp.slug === instance.slug);
    this.activeComponent(activeComp, instance);
  }

  activeComponent(component: ContainerComponent, instance) {
    this.dynamicComponent.forEach(comp => comp.active = false);
    component.active = true;
  }

  // componentExists(components, instance) {
  //   const index = components.findIndex(comp => comp.slug === instance.slug);
  //   if (index !== -1) {
  //     return true;
  //   }
  // }

}
