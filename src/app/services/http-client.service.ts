import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { PolMeterPar } from "../classes/api";

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  private httpOptions: any = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
    body: null
  };
  private headers: any = new Headers({ "Content-Type": "application/json" });
  private host: string = "http://172.18.4.56:8000/";

  constructor(private http: HttpClient) {}

  public getPosition(): Promise<any> {
    return this.http
      .get(this.host + "/GBS/GetPosition", this.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public getFluxList(): Promise<any[]> {
    return this.http
      .get(this.host + "/GBS/GetFluxList", this.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public getEnergy(): Promise<any> {
    return this.http
      .get(this.host + "/GBS/GetEnergy", this.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public getEnergyList(): Promise<any[]> {
    return this.http
      .get(this.host + "/GBS/GetEnergyList", this.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public getTest(): Promise<any[]> {
    return this.http
      .get(this.host + "/GBS/GetTest", this.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public postPosition(body: any): Promise<any[]> {
    return this.http
      .post(this.host + "GBS/PostPosition", body, this.httpOptions.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public postExpLog(body: any): Promise<any[]> {
    return this.http
      .post(this.host + "GBS/PostExpLog", body, this.httpOptions.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public postFluxPar(body: any): Promise<any[]> {
    return this.http
      .post(this.host + "GBS/PostFluxPar", body, this.httpOptions.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public postPolMeterPar(body: any): Promise<any[]> {
    return this.http
      .post(this.host + "GBS/PostPolMeterPar", body, this.httpOptions.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public getPolMeterPar(): Promise<any[]> {
    return this.http
      .get(this.host + "/GBS/GetPolMeterPar", this.headers)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public getPolMeterParTest() {
    const uri = this.host + "/GBS/GetPolMeterPar";
    return this.http.get<PolMeterPar[]>(uri);
  }

  public getTestData() {
    return this.http
      .get(this.host + "/GBS/GetPolMeterPar", { responseType: "text" })
      .pipe(
        map(res => {
          console.log(res);
          return res;
        })
      );
  }

  private errorHandler(err) {
    console.log("Error occured.", err);
    return Promise.reject(err.message || err);
  }
}
