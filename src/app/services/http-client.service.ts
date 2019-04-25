import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: null
  };
  private headers: any = new Headers({ 'Content-Type': 'application/json' });
  private host: string = 'http://192.168.161.73:8000/';

  constructor(private http: HttpClient) {}

  public getPosition(): Promise<any[]> {
    return this.http
      .get(this.host + '/GBS/GetPosition', this.headers)
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

  public postPosition(body: any): Promise<any[]> {
    return this.http
      .post(this.host + 'GBS/PostPosition', body, this.httpOptions.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public postExpLog(body: any): Promise<any[]> {
    return this.http
      .post(this.host + 'GBS/PostExpLog', body, this.httpOptions.headers)
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
