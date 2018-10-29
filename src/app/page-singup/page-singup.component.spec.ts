import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSingupComponent } from './page-singup.component';

describe('PageSingupComponent', () => {
  let component: PageSingupComponent;
  let fixture: ComponentFixture<PageSingupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSingupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
