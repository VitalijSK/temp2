import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAtricleEditComponent } from './page-atricle-edit.component';

describe('PageAtricleEditComponent', () => {
  let component: PageAtricleEditComponent;
  let fixture: ComponentFixture<PageAtricleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAtricleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAtricleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
