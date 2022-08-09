import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private router: Router) { }

  readonly BaseURI = 'https://localhost:44318/api/Users';


  getCourses(id: number):  Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI  + '/getCourses/'+ id);
  }

  getAllCourses():  Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI  + '/getAllCourses');
  }
  getCentres():  Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI  + '/getCentres/');
  }

  register(form): Observable<any> {
    return this.http.post(this.BaseURI + '/RegisterCourse', form);

  }

  getMyCourses(id: number):  Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI  + '/myCourses/'+ id);
  }

  getProfile(id: number):  Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI  + '/getProfile/'+ id);
  }

  UpdateUser(form, id): Observable<any> {
    return this.http.post(this.BaseURI + '/UpdateUser/'+id, form);

  }

}
