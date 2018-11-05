import { Component, OnInit } from '@angular/core';
import { IItem } from '../interfaces/item';
import { TreeService } from '../servies/tree/tree.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-page-tree',
  templateUrl: './page-tree.component.html',
  styleUrls: ['./page-tree.component.scss']
})
export class PageTreeComponent implements OnInit {

  itemParam: IItem;
  path : string;

  constructor(private treeService : TreeService) { }

  ngOnInit() {
    const name = 'name1';
    this.itemParam = {
      id : 1,
      name : name,
      path: name
    }
    this.treeService.setRoot(this.itemParam);
    this.treeService.selected$.pipe(
      tap( path => this.path = path)
    ).subscribe();
  }
  search ($event) {
    const value = $event.target.value;
    this.treeService.search(value)
  }
}
