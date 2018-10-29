import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSinginComponent } from './page-singin.component';

describe('PageSinginComponent', () => {
  let component: PageSinginComponent;
  let fixture: ComponentFixture<PageSinginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSinginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSinginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
