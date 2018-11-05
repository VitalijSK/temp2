import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IItem } from '../interfaces/item';
import { ItemHostDirective } from '../directives/item/item-host.directive';
import { ItemsTreeComponent } from '../items-tree/items-tree.component';
import { TreeService } from '../servies/tree/tree.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {

  @Input() param : IItem;
  @ViewChild(ItemHostDirective) itemHost: ItemHostDirective;

  created : boolean;
  hide : boolean;
  hideMain : boolean;
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private treeService : TreeService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.created = false;
    this.hide = false;
    this.hideMain = false;
    this.treeService.search$.pipe(
      tap(id => {
        if (id === this.param.id) {
          this.hideMain = false;
        } 
      })
    ).subscribe();
    this.treeService.changeVisible$.pipe(
      tap( hide => {
        this.hideMain = hide;
      })
    ).subscribe();
    this.treeService.render$.pipe(
      tap( _ => {
        this.cdr.detectChanges();
      })
    ).subscribe();
 
  }
  clickItem() {
    if (!this.created) {
      this.created = true;
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ItemsTreeComponent);

      const viewContainerRef = this.itemHost.viewContainer;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<ItemsTreeComponent>componentRef.instance).itemParams = this.treeService.getItems(this.param.path, [...this.param.keys, this.param.id]);
    } else {
      this.hide = !this.hide;
      this.treeService.selected$.next(this.param.path);
    }
  }
}