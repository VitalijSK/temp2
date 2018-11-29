import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainService } from '../main.service';
import { IArticle } from 'src/app/interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends MainService<IArticle> {
  constructor(public http : HttpClient) {
    super('articles', http);
  }
  getOffer() {
    return this.http.get<IArticle[]>(`https://localhost:3000/api/articles/offer`);
  }
  getReject() {
    return this.http.get<IArticle[]>(`https://localhost:3000/api/articles/reject`);
  }
  rejectStatus(id : string) {
    return changeStatus(id, '2', this.http);
  }
  applyStatus(id : string) {
    return changeStatus(id, '3', this.http);
  }
}
const changeStatus = (id : string, status : string, http) => {
  const data = {
    status_id : status
  };
  return http.put(`https://localhost:3000/api/articles/${id}`, data);
}