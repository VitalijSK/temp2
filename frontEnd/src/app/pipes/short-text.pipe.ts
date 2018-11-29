import { Pipe, PipeTransform } from '@angular/core';
import { IArticle } from '../interfaces/article';

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform {

  transform(articles: IArticle[], size: number): any {
    articles.forEach(article => {
      const { body } = article;
      if (body.length > size) {
        article.shortBody = body.slice(0, size) + '...';
      } else {
        article.shortBody = body;
      }
    });
    return articles;
  }

}
