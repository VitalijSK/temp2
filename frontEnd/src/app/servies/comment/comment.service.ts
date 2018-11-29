import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { HttpClient } from '@angular/common/http';
import { IComment } from 'src/app/interfaces/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends MainService<IComment> {
  constructor(public http : HttpClient) {
    super('comments', http);
  }
  getByAllId(id : string) : Observable<IComment[]> {
    return this.http.get<IComment[]>(`https://localhost:3000/api/${this.apiUrl}/all/${id}`);
  }
}
