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

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get(productUrl).pipe(
      map((response: any) => response)
    );
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get(searchUrl).pipe(
      map((response: any) => response.content)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

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
