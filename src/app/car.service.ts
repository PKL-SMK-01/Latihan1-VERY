import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Car } from './car';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  baseUrl = 'http://localhost/cars/src/app/api';
  cars: Car[];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Car[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res:any) => {
        this.cars = res['data'];
        return this.cars;
      }),
      catchError(this.handleError));
    }
    private handleError(error: HttpErrorResponse) {
    console.log(error);

    return throwError('Error! ada error bossqu :)');
  }

  store(car: Car): Observable<Car[]> {
    return this.http.post(`${this.baseUrl}/store`, { data: car })
      .pipe(map((res:any) => {
        this.cars.push(res['data']);
        return this.cars;
      }),
        catchError(this.handleError));
  }

  update(car: Car): Observable<Car[]> {
    return this.http.put(`${this.baseUrl}/update`, { data: car })
      .pipe(map((res:any) => {
        const theCar:any = this.cars.find((item:any) => {
          return +item['id'] === +car['id'];
        });
        if (theCar) {
          theCar['price'] = +car['price'];
          theCar['model'] = car['model'];
        }
        return this.cars;
      }),
        catchError(this.handleError));
  }

  delete(id: number): Observable<Car[]> {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.delete(`${this.baseUrl}/delete`, { params: params })
      .pipe(map(res => {
        const filteredCars = this.cars.filter((car:any) => {
          return +car['id'] !== +id;
        });
        return this.cars = filteredCars;
      }),
        catchError(this.handleError));
  }
}