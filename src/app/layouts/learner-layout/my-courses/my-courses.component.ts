import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeregisterCourseDialogComponent } from '../modals/deregister-course-dialog/deregister-course-dialog.component';
import { CourseService } from '../services/course.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  myCourses: any[] = [];
  constructor(public dialog: MatDialog, private courses: CourseService, private auth: AuthService) { }

  ngOnInit() {
    const id =  this.auth.getUserID;
    this.getMyCourses(id);
  }

  getMyCourses(id: number){
        this.courses.getMyCourses(id).subscribe(data => {
           console.log(data);
           this.myCourses =  data;
        })
  }

  dialogLogin(course) {
    const dialog = new MatDialogConfig;
    dialog.disableClose = false;
    dialog.width = '20rem';
    dialog.height = 'auto';
    dialog.data = { add: 'yes',course: course}
    const dialogReference = this.dialog.open(
      DeregisterCourseDialogComponent,
      dialog
    );
  }

  holder(text) {
    if(text ==null) {
      return "No data available"
    }
  }

}
