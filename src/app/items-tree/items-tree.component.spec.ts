import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsTreeComponent } from './items-tree.component';

describe('ItemsTreeComponent', () => {
  let component: ItemsTreeComponent;
  let fixture: ComponentFixture<ItemsTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
