import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageArticleRejectComponent } from './page-article-reject.component';

describe('PageArticleRejectComponent', () => {
  let component: PageArticleRejectComponent;
  let fixture: ComponentFixture<PageArticleRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageArticleRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageArticleRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
