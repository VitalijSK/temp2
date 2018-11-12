import { Injectable, EventEmitter } from '@angular/core';
import { IItem } from 'src/app/interfaces/item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  id: number;
  items: IItem[];
  selected$: BehaviorSubject<string>;
  search$: Subject<number>;
  render$: Subject<boolean>;
  changeVisible$: BehaviorSubject<boolean>;

  constructor() { }

  getItems(path: string, keys: number[]): IItem[] {
    const arr = new Array(100).fill(0);
    const items = arr.map(this.getItem(path, keys));
    this.items.push(...items);
    return items;
  }
  getItem(path: string, keys: number[]) {
    return (): IItem => {
      const name = makeName();
      const item = {
        id: this.id++,
        name: name,
        path: `${path}->${name}`,
        keys: keys
      };
      return item;
    };
  }
  setRoot(root: IItem) {
    this.selected$ = new BehaviorSubject<string>(root.path);
    this.search$ = new Subject<number>();
    this.render$ = new Subject<boolean>();
    this.changeVisible$ = new BehaviorSubject<boolean>(false);
    this.items = [];
    root.keys = [];
    this.id = root.id + 1;
    this.items.push(root);
  }
  search(value: string) {

    if (value.trim() === '') {
      this.changeVisible$.next(false);
      this.render$.next(true);
      return
    }
    this.changeVisible$.next(true);
    const ids = new Set();
    this.items.forEach(item => {
        if (item.name.includes(value)) {
          ids.add(item.id);
          item.keys.reduce((prev, elem) => {
              ids.add(elem);
              return prev;
          }, 0);
        }
    });
    ids.forEach(id => this.search$.next(id));
    this.render$.next(true);
  }
}
function makeName() {
  let name = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < 5; i++) {
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return name;
}
