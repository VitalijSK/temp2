import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { HttpClient } from '@angular/common/http';
import { ICategory } from 'src/app/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends MainService<ICategory> {
  constructor(public http : HttpClient) {
    super('categories', http);
  }
}
