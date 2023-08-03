import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonDTO } from '../interfaces/person.interface';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class PersonRestClient {

    constructor(private http: HttpClient) {

    }

    public getPersons(): Observable<any> {
        return this.http.get("http://localhost:8080" + "/person");
    }

    public addPerson(personDTO : PersonDTO): Observable<any> {

        let params = {  headers: {"Content-Type": "application/json"}};
        let body = JSON.stringify(personDTO);
        return this.http.post("http://localhost:8080" + "/person", body, params);
    }

    public modifyPerson(personDTO : PersonDTO): Observable<any> {

      let params = {  headers: {"Content-Type": "application/json"}};
      let body = JSON.stringify(personDTO);
      return this.http.put("http://localhost:8080" + "/person/update", body, params);
  }

    public deletePerson(oid: Number): Observable<any>{
      return this.http.delete("http://localhost:8080" + `/person/${oid}`, httpOptions);
  }

}
