import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IItem } from '../interfaces/item';

@Component({
  selector: 'app-items-tree',
  templateUrl: './items-tree.component.html',
  styleUrls: ['./items-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsTreeComponent implements OnInit {

  @Input() itemParams: IItem[];

  constructor() { }

  ngOnInit() {
  }
  trackByFn(index) {
    return index;
  }
}
