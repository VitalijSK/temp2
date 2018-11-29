import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArticleAddComponent } from './form-article-add.component';

describe('FormArticleAddComponent', () => {
  let component: FormArticleAddComponent;
  let fixture: ComponentFixture<FormArticleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormArticleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArticleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
