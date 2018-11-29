import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAtricleAddComponent } from './page-atricle-add.component';

describe('PageAtricleAddComponent', () => {
  let component: PageAtricleAddComponent;
  let fixture: ComponentFixture<PageAtricleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAtricleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAtricleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
