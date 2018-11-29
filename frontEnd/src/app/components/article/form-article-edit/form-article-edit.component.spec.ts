import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArticleEditComponent } from './form-article-edit.component';

describe('FormArticleEditComponent', () => {
  let component: FormArticleEditComponent;
  let fixture: ComponentFixture<FormArticleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormArticleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArticleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
