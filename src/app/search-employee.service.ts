import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchEmployeeService {

  private searchEmployees = 'http://localhost:8080/api/v1/employees';
  private searchEmployee = 'http://localhost:8080/api/v1/employee/';


  constructor(private http: HttpClient) { }

  getEmployees(idEmployee? : string): Observable<any> {
    let url = this.searchEmployees;
    if(idEmployee) {
      url = this.searchEmployee + idEmployee;
    }
    return this.http.get(url);
  }
}
