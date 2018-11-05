import { Component, OnInit } from '@angular/core';
import { IItem } from '../interfaces/item';
import { TreeService } from '../servies/tree/tree.service';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-page-tree',
  templateUrl: './page-tree.component.html',
  styleUrls: ['./page-tree.component.scss']
})
export class PageTreeComponent implements OnInit {

  itemParam: IItem;
  path: string;
  searchData : FormControl;

  constructor(private treeService: TreeService) { }

  ngOnInit() {
    this.searchData = new FormControl(['']);
    const name = 'name1';
    this.itemParam = {
      id: 1,
      name: name,
      path: name
    }
    this.treeService.setRoot(this.itemParam);
    this.treeService.selected$.pipe(
      tap(path => this.path = path)
    ).subscribe();
    
    this.searchData.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(value=> {
        this.treeService.search(value)
      })
    ).subscribe();
  }

}
