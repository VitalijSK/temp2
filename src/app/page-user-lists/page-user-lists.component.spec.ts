import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUserListsComponent } from './page-user-lists.component';

describe('PageUserListsComponent', () => {
  let component: PageUserListsComponent;
  let fixture: ComponentFixture<PageUserListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageUserListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUserListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
