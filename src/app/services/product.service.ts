import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {catchError, map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/v1/products';
  private categoryUrl = 'http://localhost:8080/api/v1/categories';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get(searchUrl).pipe(
      map((response: any) => response.content)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get(this.categoryUrl).pipe(
      map((response: any) => response)
    );
  }
}
