import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private headers: any = new Headers({ 'Content-Type': 'application/json' });
  // private host: string = 'http://localhost:4200/api';
  // private host: string = 'http://localhost:8000/';
  private host: string = 'http://192.168.161.73:8000/';

  constructor(private http: HttpClient) {}

  public getPosition(): Promise<any[]> {
    return this.http
      .get(this.host + '/GBS/GetAll', this.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public getFlux(): Promise<any[]> {
    return this.http
      .get(this.host + '/GBS/GetFlux', this.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public getEnergy(): Promise<any[]> {
    return this.http
      .get(this.host + '/GBS/GetEnergy', this.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public getTest(): Promise<any[]> {
    return this.http
      .get(this.host + '/GBS/GetTest', this.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  private errorHandler(err) {
    console.log('Error occured.', err);
    return Promise.reject(err.message || err);
  }
}
