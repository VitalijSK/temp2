import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageArticleOfferComponent } from './page-article-offer.component';

describe('PageArticleOfferComponent', () => {
  let component: PageArticleOfferComponent;
  let fixture: ComponentFixture<PageArticleOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageArticleOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageArticleOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
