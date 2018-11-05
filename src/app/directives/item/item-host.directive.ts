import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appItemHost]'
})
export class ItemHostDirective {
  viewContainer: ViewContainerRef;
  constructor(private viewContainerRef: ViewContainerRef) { 
    this.viewContainer = viewContainerRef;
  }

}
